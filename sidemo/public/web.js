var tendto = {x:300,y:300}
var pageWidth
var pageHeight
var datalog = []
var seatWidth
var seatHeight
var rows = 10
var wide = 16
var xData = []
var yData = []
var maxTemp = -1000
var minTemp = 9999
var sumTemp = 0
var aveTemp
var maxNoise = -1000
var minNoise = 9999
var aveNoise
var sumNoise = 0
var dataCount = 0

$(document).ready(function() {

	seating()

	// pageWidth = document.body.clientWidth
	// pageHeight = document.body.clientHeight

	// pageWidth = $('#seating').innerWidth()
	// pageHeight = $('#seating').innerHeight()

	// var canvas = document.getElementById('canv')
	// canvas.width = pageWidth
 //    canvas.height = pageHeight

 	
	

	

 	setTimeout(function() {

 		seatWidth = $('#seat0').width()+4
	 	seatHeight = $('#seat0').height()+4
 		console.log(seatWidth)

 		pageWidth = $('#seating').innerWidth()
		pageHeight = $('#seating').innerHeight()

		var canvas = document.getElementById('canv')
		canvas.width = pageWidth
	    canvas.height = pageHeight

	    // var chartCanvas = document.getElementById("dynchart")
	    // chartCanvas.width = $('#dyncharting').innerWidth()
	    // chartCanvas.height = $('#dyncharting').innerHeight()

		tracker()
	},1000)
 	
})

function tracker() {
	var canvas = document.getElementById('canv')
	// canvas.width = pageWidth
 //    canvas.height = pageHeight

    // var streamCanvas = document.getElementById('escanv')
    // console.log('es width',$('#eventstream').innerWidth())
    // console.log('es height',$('#eventstream').innerHeight())
    // streamCanvas.width = $('#eventstream').width()
    // streamCanvas.height = $('#eventstream').height()
    // var streamCtx = streamCanvas.getContext('2d')

	var ctx = canvas.getContext('2d')
	// var graph = graphInit()

	// initialise chart
	CanvasJS.addColorSet('green',['#66FF00','#F3F315'])
	var chart = new CanvasJS.Chart("dyncharting",{
		backgroundColor: null,
		colorSet: 'green',
		axisX: {
			lineThickness: 1,
			tickThickness: 1,
			lineColor: '#AAA'
		},
		axisY: {
			lineThickness: 1,
			tickThickness: 1,
			gridThickness: 0,
			gridColor: '#AAA',
			lineColor: '#AAA'
		},
		data: [
			{
				type: "line",
				dataPoints: xData 
			},
			{
				type: "line",
				dataPoints: yData
			}
		]
	});

	console.log('ready')
	var socket = new WebSocket("ws://localhost:8080")

	socket.onopen = function(event) {
		socket.send(JSON.stringify(tendto))
	}

	socket.onmessage = function(event) {
		var d = JSON.parse(event.data)
		// console.log(d.x)
		drawIt(canvas, ctx, d.x, d.y)
		logIt(null, null, d)
		graphIt(chart,d)
	}

	// $('#seating').click(function(e) {
	// 	tendto.x = e.pageX - $(this).parent().offset().left
	// 	tendto.y = e.pageY - $(this).parent().offset().top
	// 	socket.send(JSON.stringify(tendto))
	// })

	canvas.addEventListener('mousedown', function(event) {
		// console.log(event)
		tendto.x = event.layerX
		tendto.y = event.layerY
		socket.send(JSON.stringify(tendto))
		highlightSeat(tendto.x,tendto.y)
	}, false)
}

// function graphInit() {
// 	var labs = []
// 	for (var x=0; x<100; x++) {
// 		labs.push(x)
// 	}
// 	var data = {
// 		labels: labs,
// 		datasets: [
// 			{
// 				label: "x-axis",
// 				fillColor: "rgba(220,220,220,0.2)",
//             	strokeColor: "rgba(220,220,220,1)",
//             	pointColor: "rgba(220,220,220,1)",
//             	pointStrokeColor: "#fff",
//             	pointHighlightFill: "#fff",
//             	pointHighlightStroke: "rgba(220,220,220,1)",
//             	data: [23,24]
// 			}
// 		]
// 	}

// 	var chartCtx = document.getElementById("dynchart").getContext('2d')
// 	var graph = new Chart(chartCtx).Line(data,opts)
// 	console.log(graph)
// 	return graph
// }
var count = 0
function graphIt(chart, d) {
	if (xData.length > 500) {
		// xData.splice(0,1)
		xData.shift()
		yData.shift()
	}
	xData.push({x:count,y:d.t})
	yData.push({x:count,y:d.s})
	// console.log(xData)

	// graph.datasets[0].points = xData
	// graph.update()
	chart.render()
	count++
}

function drawIt(canvas,ctx,x,y) {
	// console.log('circle',x,y)
	ctx.clearRect(0, 0, $('#auditorium').innerWidth(), $('#auditorium').innerHeight());
	ctx.beginPath()
	ctx.strokeStyle = 'white'
	ctx.arc(x,y,10,0,2*Math.PI)
	ctx.stroke()
	ctx.closePath()
	ctx.beginPath()
	ctx.fillStyle = 'red'
	ctx.arc(tendto.x,tendto.y,2,0,2*Math.PI)
	ctx.fill()
	ctx.closePath()
	// $('#thing').css('top', y+'px')
	// $('#thing').css('left', x+'px')
	highlightSeat(x,y)
}
// var logged = false
function logIt(canvas, ctx, d) {
	dataCount++
	
	if (datalog.length > 100) {
		// if (logged === false) console.log(datalog)
		// logged = true
		datalog.splice(0,1)
	}
	datalog.push(d)

	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.font = "12px Georgia"
	// ctx.fillStyle = '#66FF00'
	var alltext = ''
	for (var i in datalog) {
		// console.log(i)
		// ctx.fillText(JSON.stringify(datalog[i]),10,((i*12)+1))
		// alltext += JSON.stringify(datalog[i])+"\n"
		alltext += '['+datalog[i].x+','+datalog[i].y+','+datalog[i].t+','+datalog[i].s+']\n'
	}
	$('#textstream').val(alltext)

	sumTemp += d.t
	aveTemp = parseFloat(sumTemp / dataCount).toFixed(2)
	if (d.t > maxTemp) maxTemp = d.t
	if (d.t < minTemp) minTemp = d.t

	sumNoise += d.s
	aveNoise = parseFloat(sumNoise / dataCount).toFixed(2)
	if (d.s > maxNoise) maxNoise = d.s
	if (d.s < minNoise) minNoise = d.s	

	$('#eventCountStat').text(dataCount)
	$('#maxTempStat').text(maxTemp)
	$('#minTempStat').text(minTemp)
	$('#aveTempStat').text(aveTemp)
	$('#maxNoiseStat').text(maxNoise)
	$('#minNoiseStat').text(minNoise)
	$('#aveNoiseStat').text(aveNoise)
	// console.log(dataCount)
}

function highlightSeat(x,y) {
	
	var col = Math.floor(( (x-10) / (seatWidth+2) ))
	// console.log((x-10),(seatWidth+2),col)

	var row = Math.floor(( (y-10) / (seatHeight+2) ))

	// console.log(col,row)
	var seat = ((row*wide)+col)
	// console.log('seat',seat)
	$('.seat').removeClass('hl')
	// $('#seat'+seat).css('border','1px solid red')
	$('#seat'+seat).addClass('hl')
}

function seating() {

	for (var x=0; x<rows; x++) {
		$('#seating').append("<div id='row"+x+"' class='row'></div>")

		for (var y=0; y<wide; y++) {
			$('#row'+x).append("<div id='seat"+((x*wide)+y)+"' class='seat'></div>")
		}
	}

	// var rowHeight = ( Math.round(pageHeight / rows) )

	// for (var x=0; x<(rows*wide); x++) {
	// 	$('#seating').append("<div id='seat"+x+"' class='seat'></div>")
	// }
	// var seatWidth = ( Math.round(pageWidth / wide) - 6 )
	// var seatHeight = ( Math.round(pageHeight / rows) - 6 )
	// console.log(seatWidth,seatHeight)

	// $(".seat").css({"max-height":seatHeight+'px', "max-width":seatWidth+'px', "height":seatHeight+'px', "width":seatWidth+'px', "min-width":seatWidth+'px', "max-height":seatHeight+'px'})
}

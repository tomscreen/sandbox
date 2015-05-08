var tendto = {x:300,y:300}
var pageWidth
var pageHeight
var datalog = []
var seatWidth
var seatHeight
var rows = 25
var wide = 50
var xData = []

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
	CanvasJS.addColorSet('green',['#66FF00'])
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
		data: [{
			type: "line",
			dataPoints: xData 

		}]
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

// 	Chart.defaults.global = {
// 	    // Boolean - Whether to animate the chart
// 	    animation: true,

// 	    // Number - Number of animation steps
// 	    animationSteps: 60,

// 	    // String - Animation easing effect
// 	    // Possible effects are:
// 	    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
// 	    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
// 	    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
// 	    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
// 	    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
// 	    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
// 	    //  easeOutElastic, easeInCubic]
// 	    animationEasing: "easeOutQuart",

// 	    // Boolean - If we should show the scale at all
// 	    showScale: true,

// 	    // Boolean - If we want to override with a hard coded scale
// 	    scaleOverride: false,

// 	    // ** Required if scaleOverride is true **
// 	    // Number - The number of steps in a hard coded scale
// 	    scaleSteps: null,
// 	    // Number - The value jump in the hard coded scale
// 	    scaleStepWidth: null,
// 	    // Number - The scale starting value
// 	    scaleStartValue: null,

// 	    // String - Colour of the scale line
// 	    scaleLineColor: "rgba(0,0,0,.1)",

// 	    // Number - Pixel width of the scale line
// 	    scaleLineWidth: 1,

// 	    // Boolean - Whether to show labels on the scale
// 	    scaleShowLabels: true,

// 	    // Interpolated JS string - can access value
// 	    scaleLabel: "<%=value%>",

// 	    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
// 	    scaleIntegersOnly: true,

// 	    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
// 	    scaleBeginAtZero: false,

// 	    // String - Scale label font declaration for the scale label
// 	    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

// 	    // Number - Scale label font size in pixels
// 	    scaleFontSize: 12,

// 	    // String - Scale label font weight style
// 	    scaleFontStyle: "normal",

// 	    // String - Scale label font colour
// 	    scaleFontColor: "#666",

// 	    // Boolean - whether or not the chart should be responsive and resize when the browser does.
// 	    responsive: false,

// 	    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
// 	    maintainAspectRatio: true,

// 	    // Boolean - Determines whether to draw tooltips on the canvas or not
// 	    showTooltips: true,

// 	    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
// 	    customTooltips: false,

// 	    // Array - Array of string names to attach tooltip events
// 	    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

// 	    // String - Tooltip background colour
// 	    tooltipFillColor: "rgba(0,0,0,0.8)",

// 	    // String - Tooltip label font declaration for the scale label
// 	    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

// 	    // Number - Tooltip label font size in pixels
// 	    tooltipFontSize: 14,

// 	    // String - Tooltip font weight style
// 	    tooltipFontStyle: "normal",

// 	    // String - Tooltip label font colour
// 	    tooltipFontColor: "#fff",

// 	    // String - Tooltip title font declaration for the scale label
// 	    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

// 	    // Number - Tooltip title font size in pixels
// 	    tooltipTitleFontSize: 14,

// 	    // String - Tooltip title font weight style
// 	    tooltipTitleFontStyle: "bold",

// 	    // String - Tooltip title font colour
// 	    tooltipTitleFontColor: "#fff",

// 	    // Number - pixel width of padding around tooltip text
// 	    tooltipYPadding: 6,

// 	    // Number - pixel width of padding around tooltip text
// 	    tooltipXPadding: 6,

// 	    // Number - Size of the caret on the tooltip
// 	    tooltipCaretSize: 8,

// 	    // Number - Pixel radius of the tooltip border
// 	    tooltipCornerRadius: 6,

// 	    // Number - Pixel offset from point x to tooltip edge
// 	    tooltipXOffset: 10,

// 	    // String - Template string for single tooltips
// 	    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

// 	    // String - Template string for multiple tooltips
// 	    multiTooltipTemplate: "<%= value %>",

// 	    // Function - Will fire on animation progression.
// 	    onAnimationProgress: function(){},

// 	    // Function - Will fire on animation completion.
// 	    onAnimationComplete: function(){}
// 	}

// 	var opts = {
// 	    ///Boolean - Whether grid lines are shown across the chart
// 	    scaleShowGridLines : true,

// 	    //String - Colour of the grid lines
// 	    scaleGridLineColor : "rgba(0,0,0,.05)",

// 	    //Number - Width of the grid lines
// 	    scaleGridLineWidth : 1,

// 	    //Boolean - Whether to show horizontal lines (except X axis)
// 	    scaleShowHorizontalLines: true,

// 	    //Boolean - Whether to show vertical lines (except Y axis)
// 	    scaleShowVerticalLines: true,

// 	    //Boolean - Whether the line is curved between points
// 	    bezierCurve : true,

// 	    //Number - Tension of the bezier curve between points
// 	    bezierCurveTension : 0.4,

// 	    //Boolean - Whether to show a dot for each point
// 	    pointDot : true,

// 	    //Number - Radius of each point dot in pixels
// 	    pointDotRadius : 1,

// 	    //Number - Pixel width of point dot stroke
// 	    pointDotStrokeWidth : 1,

// 	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
// 	    pointHitDetectionRadius : 20,

// 	    //Boolean - Whether to show a stroke for datasets
// 	    datasetStroke : true,

// 	    //Number - Pixel width of dataset stroke
// 	    datasetStrokeWidth : 1,

// 	    //Boolean - Whether to fill the dataset with a colour
// 	    datasetFill : false,

// 	    //String - A legend template
// 	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

// 	}

// 	var chartCtx = document.getElementById("dynchart").getContext('2d')
// 	var graph = new Chart(chartCtx).Line(data,opts)
// 	console.log(graph)
// 	return graph
// }
var count = 0
function graphIt(chart, d) {
	if (xData.length > 1000) {
		// xData.splice(0,1)
		xData.shift()
	}
	xData.push({x:count,y:d.x})
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

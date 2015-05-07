var tendto = {x:300,y:300}
var pageWidth
var pageHeight
var datalog = []

$(document).ready(function() {

	pageWidth = document.body.clientWidth
	pageHeight = document.body.clientHeight

	tracker()
	seating(10,16)

})

function tracker() {
	// var canvas = document.getElementById('canv')
	// canvas.width = pageWidth
 //    canvas.height = pageHeight

    var streamCanvas = document.getElementById('escanv')
    // console.log('es width',$('#eventstream').innerWidth())
    // console.log('es height',$('#eventstream').innerHeight())
    streamCanvas.width = $('#eventstream').width()
    streamCanvas.height = $('#eventstream').height()
    var streamCtx = streamCanvas.getContext('2d')

	// var ctx = canvas.getContext('2d')

	console.log('ready')
	var socket = new WebSocket("ws://localhost:8080")

	socket.onopen = function(event) {
		socket.send(JSON.stringify(tendto))
	}

	socket.onmessage = function(event) {
		var d = JSON.parse(event.data)
		// console.log(d.x)
		// drawIt(canvas, ctx, d.x, d.y)
		logIt(streamCanvas, streamCtx, d)
	}

	// canvas.addEventListener('mousedown', function(event) {
	// 	tendto.x = event.pageX
	// 	tendto.y = event.pageY
	// 	socket.send(JSON.stringify(tendto))
	// }, false)
}

function drawIt(canvas,ctx,x,y) {
	// console.log('circle',x,y)
	ctx.clearRect(0, 0, canvas.width, canvas.height);
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
}
// var logged = false
function logIt(canvas, ctx, d) {
	
	if (datalog.length > 60) {
		// if (logged === false) console.log(datalog)
		// logged = true
		datalog.splice(0,1)
	}
	datalog.push(d)

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "12px Georgia"
	ctx.fillStyle = '#66FF00'
	for (var i in datalog) {
		// console.log(i)
		ctx.fillText(JSON.stringify(datalog[i]),10,((i*12)+1))
	}
}

function seating(rows,wide) {

	for (var x=0; x<rows; x++) {
		$('#seating').append("<div id='row"+x+"' class='row'></div>")

		for (var y=0; y<wide; y++) {
			$('#row'+x).append("<div id='seat"+(x*y)+"' class='seat'></div>")
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

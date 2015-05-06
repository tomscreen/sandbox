$(document).ready(function() {

	// var canv = $('canv').getContext('2d')
	var canv = document.getElementById('canv').getContext('2d')
	canv.moveTo(10,10)
	canv.lineTo(200,150)
	canv.stroke()

})
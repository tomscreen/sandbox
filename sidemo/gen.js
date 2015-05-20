var restify = require('restify')
var client = restify.createJsonClient({
	url: 'http://localhost:8082'
})

var data = {x:200,y:200,t:19,s:46}
var tendto = {x:0,y:0}

function generateData() {

	client.post('/data', data, function(err, req, res, obj) {
		tendto = JSON.parse(obj)
	})

	if (tendto.x > data.x)
		data.x = data.x + getRandomInt(-2,5)
	else
		data.x = data.x + getRandomInt(-4,3)
	if (tendto.y > data.y)
		data.y = data.y + getRandomInt(-2,5)
	else
		data.y = data.y + getRandomInt(-4,3)

	data.t = data.t + getRandomInt(-1,2)
	if (data.t > 35) data.t = 35
	if (data.t < 10) data.t = 10

	data.s = data.s + getRandomInt(-1,2)
	if (data.s > 80) data.s = 80
	if (data.s < 5) data.s = 5

	setTimeout(function() {
		generateData()
	},10)
}

generateData()

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// ORIGINAL CODE

// var coords = {x:100,y:100}

// function genCoords() {
// 	console.log(coords)

// 	coords.x = coords.x + getRandomInt(-3,3)
// 	coords.y = coords.y + getRandomInt(-3,3)

// 	setTimeout(genCoords,200)
// }

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// genCoords()
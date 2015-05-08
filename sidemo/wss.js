var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 8080 })

var tendto = {x:0,y:0}

wss.on('connection', function connection(ws) {
  	ws.on('message', function incoming(message) {
    	console.log('received: %s', message)
    	tendto = JSON.parse(message)
  	})

  	genCoords(ws)
})

var coords = {x:200,y:200,t:19,s:46}

function genCoords(ws) {
	// console.log(coords)
	ws.send(JSON.stringify(coords))

	if (tendto.x > coords.x)
		coords.x = coords.x + getRandomInt(-2,5)
	else
		coords.x = coords.x + getRandomInt(-4,3)
	if (tendto.y > coords.y)
		coords.y = coords.y + getRandomInt(-2,5)
	else
		coords.y = coords.y + getRandomInt(-4,3)

	setTimeout(function() {
		genCoords(ws)
	},10)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// Web Server (8081)
var express = require('express')
var app = express()
app.use(express.static(__dirname+'/public/'))
app.listen(8081)

// Web Sockets Server (8080)
var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 8080 })

var tendto = {x:0,y:0}

var wsInst
wss.on('connection', function connection(ws) {
	wsInst = ws
	console.log('WSS Connection accepted')
  	ws.on('message', function incoming(message) {
    	console.log('received: %s', message)
    	tendto = JSON.parse(message)
  	})
})

// REST Server (8082)
var restify = require('restify')
var restServer = restify.createServer()
restServer.use(restify.bodyParser());
restServer.listen(8082)

restServer.post('/data', function(req,res,next) {
	// console.log(req.params)
	if (wsInst !== undefined) {
		// console.log('trying to send to websocket')
		wsInst.send(JSON.stringify(req.params))
	}

	res.send(201, JSON.stringify(tendto));
	return next()
})

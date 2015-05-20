var app = require('express')();
var http = require('http').Server(app);
var restify = require('restify');

app.get('/EventService', function(req, res){
  res.sendFile(__dirname + '/line.html');
});
	//REST service details 
	var ip_addr = 'localhost';
	var port    =  '4500';
		 
	var server = restify.createServer({
	    name : "myapp"
	});

	server.use(restify.queryParser());
	server.use(restify.bodyParser());
	server.use(restify.CORS());
		
	var PATH = '/event'
	server.listen(port ,ip_addr, function(){
		console.log('%s listening at %s ', server.name , server.url);
	});
//END of RESTify		

//Web socket
	var WebSocketServer = require('ws').Server
  	, wss = new WebSocketServer({ port: 4000 });

//web socket open connection
	wss.on('connection', function connection(ws) {
	  	

	  		//RESTIFY here?
	  		//Restify service details
			server.post({path : PATH , version: '0.0.1'} , function(req, res , next) {
				req.setHeader('Access-Control-Allow-Origin','*');
				var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
				var xSrv = req.params.x + randomScalingFactor();
			   var ySrv = req.params.y + randomScalingFactor();
			   var tempSrv = req.params.temperature;
			   var noiseSrv = req.params.noise;
		    	//console.log('received: %s', message);
		   		var myBox = {     
		   			x: xSrv,
		   			y: ySrv,
		   			temp: tempSrv,
		   			noise: noiseSrv
				};
			   		try{	
			   			//send a websocket message
			   			console.log('msg recieved to rest service: ' + 'hello from a service, co-ordinates recieved: ' + xSrv + ":" + ySrv + 'temperature: ' + tempSrv + " current noise level: " + noiseSrv);
			  			ws.send(JSON.stringify(myBox));
			 			res.send(200 , 'success'); 
			  		}catch (e){
			  			console.log(e);
			  		}
			});	

//websocket catch messages coming back from the client
			 ws.on('message', function incoming(message) {
	    			
			});
  	});

//http web server connection
http.listen(4001, function(){
  console.log('listening on *:4001');
});


 



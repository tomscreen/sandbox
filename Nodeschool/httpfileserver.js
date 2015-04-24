var http  = require('http');
var fs = require('fs');

http.createServer(function(request,response) {
	response.writeHead(200, { 'content-type': 'text/plain' });
	fs.createReadStream(process.argv[3]).pipe(response);

}).listen(process.argv[2]);
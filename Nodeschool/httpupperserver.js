var http = require('http');
var map = require('through2-map');

http.createServer(function(request,response) {
	if (request.method != 'POST')
		return res.end('Only use POST!\n');
	
	var map = require('through2-map')
    request.pipe(map(function (chunk) {
      return chunk.toString().toUpperCase();
    })).pipe(response);

}).listen(process.argv[2]);
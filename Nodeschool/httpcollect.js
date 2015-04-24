var bl = require('bl');
var http = require('http');

http.get(process.argv[2], function(response) {
	
	response.pipe(bl(function(err,data) {
		console.log(data.length);
		console.log(data.toString());
	}));

});
var fs = require('fs');
var path = require('path');

var dir = process.argv[2];
var ext = process.argv[3];

fs.readdir(dir, function(err, list) {

	list = list.filter(function(item) {
		return path.extname(item) === '.'+ext;
	});
	
	list.forEach(function(item) {
		console.log(item);
	});

});
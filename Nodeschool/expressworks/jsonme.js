var express = require('express')
var fs = require('fs')
var app = express()

fs.readFile(process.argv[3], 'utf8', function(err, data) {
	app.get('/books', function(req,res) {
		res.json(JSON.parse(data))
	}).listen(process.argv[2])
});
var express = require('express')

var app = express()
app.get('/search', function(req,res) {
	res.json(req.query)
})
app.listen(process.argv[2])
var express = require('express')
var stylus = require('stylus')

var app = express()
app.use('/', express.static(__dirname + '/'))
app.use(stylus.middleware(__dirname + '/'))

app.listen(process.argv[2])
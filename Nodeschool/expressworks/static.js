var express = require('express')
console.log(__dirname)
var app = express()
app.use(express.static(__dirname+'/'))
app.listen(process.argv[2])
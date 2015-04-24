var express = require('express')
var passport = require('passport')
// var PassportLocal = require('passport-local')
var PassportBasic = require('passport-http').BasicStrategy


var users = [
	{id:1, username:'bob', password:'secret', email:'bob@acme.com'},
	{id:2, username:'fred', password:'passw0rd', email:'fred@acme.com'}
]

function findInUsers(username) {
	for (var u in users) {
		if (users[u].username = username) 
			return users[u]
	}
	return null
}

passport.use(new PassportBasic(function(username, password, done) {
	console.log(username, password, done)
	var user = findInUsers(username)
	if (!user) return done(null, false)
	if (user.password !== password) return done(null, false)
	return done(null, user)
}))

var app = express()
app.use(passport.initialize())

app.get('/', 
	passport.authenticate('basic', {session:false}), 
	function(req,res) {
	res.json({message: 'hello', username: req.user.username, email: req.user.email})
	res.end()
}).listen(3000)

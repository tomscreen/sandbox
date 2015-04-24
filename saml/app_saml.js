var https = require('https')
var fs = require('fs')
var express = require('express')
var passport = require('passport')
// var PassportLocal = require('passport-local')
// var PassportBasic = require('passport-http').BasicStrategy
var SamlStrategy = require('passport-saml').Strategy


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

passport.use(new SamlStrategy(
	{
		// path: '/login/callback',
		entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
		issuer: 'http://192.168.12.17:3000',
		callbackUrl: 'http://192.168.12.17:3000/login/callback'
		// ,privateCert: fs.readFileSync('./cert.pem', 'utf-8')
	},
	function(profile, done) {
		findByEmail(profile.email, function(err, user) {
			if (err) return done(err)
			return done(null, user)
		})
	}
))

var app = express()
app.use(passport.initialize())

app.get('/', 
	function(req,res) {
		// console.log('get/',req)
		res.json({message: 'hello'})
		res.end()
	}
)

app.get('/fail', 
	function(req,res) {
		console.log('get/fail',req)
		res.json({message: '#fail'})
		res.end()
	}
)

app.get('/login',
	passport.authenticate('saml', {failureRedirect: '/fail', failureFlash: true}),
	function(req,res) {
		console.log('get/login',req)
		res.redirect('/')
	}
)

app.post('/login/callback',
	passport.authenticate('saml', {failureRedirect: '/fail', failureFlash: true}),
	function(req,res) {
		console.log('post/login/callback',req)
		res.redirect('/')
	}
)


// https.createServer({
// 	key: fs.readFileSync('key.pem'),
// 	cert: fs.readFileSync('cert.pem')
// }, app).listen(3000)

app.listen(3000)


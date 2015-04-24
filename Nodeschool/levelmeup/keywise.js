var level = require('level')
var db = level(process.argv[2], {valueEncoding: 'json'})
var stuff = require(process.argv[3])

stuff.forEach(function(d) {
	console.error(d)

	if (d.type === 'user') {
		db.put(d.name, d, function(err) {
			if (err) return console.error(err)
		})
	}

	if (d.type === 'repo')
		db.put(d.user+'!'+d.name, d, function(err) {
			if (err) return console.error(err)
		})
})
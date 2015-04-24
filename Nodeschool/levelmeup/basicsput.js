var level = require('level')
var db = level(process.argv[2])

var obj = JSON.parse(process.argv[3])

for (var i in obj) {
	// console.error('%s = %s',i,obj[i])

	db.put(i, obj[i], function(err) {
		if (err) return console.error(err)
	})
}
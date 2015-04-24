var level = require('level')
var db = level(process.argv[2])

for (x=0;x<101;x++) {
	dbGet('key'+x)
}

function dbGet(key) {
	db.get(key, function(err, value) {
		if (err) ;
		else console.log(key+'='+value)
	})
}

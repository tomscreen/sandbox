var level = require('level')
var fs = require('fs');

var db = level(process.argv[2])
var path = process.argv[3]

lines = fs.readFileSync(path).toString().split('\n')

var b = []

for (var i in lines) {
	arr = lines[i].split(',')

	var d = {}
	d.type = arr[0]
	d.key = arr[1]
	if (d.type === 'put')
		d.value = arr[2]

	// console.error(d)
	b.push(d)
}
// b.push(function() {
// 	console.error('done')
// })
// console.error(lines.length-1)
// console.error(b)

db.batch(b, function(err) {
	console.error(err)
})
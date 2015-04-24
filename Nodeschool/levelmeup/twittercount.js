
module.exports = function(db, date, callback) {
	// console.error(date)
	var count = 0

	db.createReadStream({start:date}).on('data', function(data) {
		count++
		// console.error(count)
	}).on('end', function() {
		// console.error(count)
		callback(null, count)
	})

}
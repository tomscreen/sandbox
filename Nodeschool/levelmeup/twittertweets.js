
module.exports = function(db, date, callback) {
	// console.error(date)
	var tweets = []

	db.createReadStream({start:date, end:(date+'\xff')})
	  .on('data', function(data) {
		tweets.push(data.value)
		// console.error(count)
	})
	  .on('end', function() {
		// console.error(count)
		callback(null, tweets)
	})

}
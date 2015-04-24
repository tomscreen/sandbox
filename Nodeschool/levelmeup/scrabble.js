module.exports.init = function(db, words, callback) {

	var ops = words.map(function(word) {
		var k = word.length+word
		return {type:'put',key:k,value:word}
	})

	db.batch(ops, function(err) {
		if (err) return console.error(err)
	})

	if (callback)
		callback(null)
}

module.exports.query = function(db, word, callback) {
	
	var words = []
	var s = word.length+word.replace(/\*/g,'')
	var e = s + '\xff'
	
	db.createReadStream({start:s, end:e})
	  .on('data', function(data) {
		words.push(data.value)
	})
	  .on('end', function() {
		if (callback)
			callback(null,words)
	})
}
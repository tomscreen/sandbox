var mongo = require('mongodb').MongoClient
var assert = require('assert')

var url = 'mongodb://localhost:27017/mydb'

mongo.connect(url, function(err, db) {
	assert.equal(null, err)
	console.log('connected to mydb')

	findAll(db, 'scenario', function() {
		db.close()
		console.log('connection closed')
	})
})

var findAll = function(db, collection, callback) {
	var col = db.collection(collection)

	var cursor = col.find({}).limit(5)
	assert.equal(false, cursor.isClosed())
	cursor.forEach(function(doc) {
		console.log(doc)
	}, function(err) {
		if (err) return console.error(err)
		callback()
	})
}
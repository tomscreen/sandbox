var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'

mongo.connect(url, function(err, db) {
	console.log('connected to mydb')

	var inProgress = 0
	function closeConn() {
		// console.log('inProgress=',inProgress)
		if (inProgress <= 0) {
			console.log('closing connection',inProgress)
			db.close();
		}
	}

	// For each scenario...
	findAll(db, 'scenario', {}, function perScenario(scenario) {
		inProgress++
		// console.log('inProgress=',inProgress)
		// console.log(subRegex(scenario));
		var scenarioMatch = subRegex(scenario)
		// console.log('Finding all for...')
		// console.log(scenarioMatch)

		// Find matching records in inputData
		findAll(db, 'inputData', scenarioMatch, function perMatch(inputData) {
			// console.log('inProgress=',inProgress)
			// Got a matching record, spit it out!
			// console.log("Scenario:")
			console.log(scenarioMatch)
			// console.log("Matched Record:")
			console.log(inputData)
		}, function lastMatch() {
			inProgress--
			closeConn()
		})

	}, function lastScenario() {
	})

})

var findAll = function(db, collection, filter, callback, endCallback) {
	var col = db.collection(collection)
	var cursor = col.find(filter)

	cursor.forEach(function(doc) {
		callback(doc)
	}, function(err) {
		if (err) return console.error(err)
		endCallback()
	})

}

var subRegex = function(doc) {
	// Add $ on to the front of the regex
	// console.log('doing regex for')
	// console.log(doc)

	for (var i in doc.criteria) {
		// console.log(i)
		if (doc.criteria[i].constructor === {}.constructor) {
			// console.log('OBJECT')
			if (doc.criteria[i].hasOwnProperty('regex')) {
				doc.criteria[i]["$regex"] = doc.criteria[i].regex
				delete doc.criteria[i].regex
			}
		}
	}

	return doc.criteria
}

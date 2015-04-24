var mongo = require('mongodb').MongoClient
var async = require('async')
var dbName = process.argv[2]
var url = 'mongodb://localhost:27017/'+dbName

mongo.connect(url, function(err, db) {
	console.log('connected to',dbName)
	var scenarios = []

	async.series([
		function findScenarios(cbFindScenarios) {
			db.collection('scenario').find().toArray(function(err,docs) {
				scenarios = docs
				cbFindScenarios()
			})
		},
		function matchInputDocs(cbMatchInputDocs) {

			async.forEach(scenarios, function forEachScenario(scenario, cbForEachScenario) {

				var thisScenario = scenario
				var theseDocs = []

				async.series([
					function findInputDocs(cbFindInputDocs) {

						db.collection('inputData').find(subRegex(scenario)).toArray(function(err,docs) {
							// Have scenario and matching input docs
							theseDocs = docs
							cbFindInputDocs()
						})

					},
					function updateInputDocs(cbUpdateInputDocs) {
						async.forEach(theseDocs, function forEachInputDoc(thisDoc, cbForEachInputDoc) {

							console.log('updating material %s matching scenario %s',
								thisDoc.Material,thisScenario.scenario)

							cbForEachInputDoc()

						}, function(err) {
							cbUpdateInputDocs()
						})
					}
				], function(err) {
					cbForEachScenario()
				})

			}, function(err) {
				cbMatchInputDocs()
			})
		}
	], function(err) {
		db.close()
		console.log('disconnected from',dbName)
	})
})

var subRegex = function(doc) {
	// Add $ on to the front of the regex
	for (var i in doc.criteria) {
		if (doc.criteria[i].constructor === {}.constructor) {
			if (doc.criteria[i].hasOwnProperty('regex')) {
				doc.criteria[i]["$regex"] = doc.criteria[i].regex
				delete doc.criteria[i].regex
			}
		}
	}
	return doc.criteria
}

var mongo = require('mongodb').MongoClient
var async = require('async')
var dbName = process.argv[2]
var url = 'mongodb://localhost:27017/'+dbName

mongo.connect(url, function(err, db) {
	console.log('connected to',dbName)

	async.series([
		function deleteInputData(cbDeleteInputData) {
			db.collection('inputData').deleteMany({}. null, function() {
				console.log('delete inputData records completed')
				cbDeleteInputData()
			})

		},
		function deleteScenarios(cbDeleteScenarios) {
			db.collection('scenario').deleteMany({}, null, function() {
				console.log('delete scenario records completed')
				cbDeleteScenarios()
			})
		},
		function deleteOutput(cbDeleteOutput) {
			db.collection('output').deleteMany({}, null, function() {
				console.log('delete output records completed')
				cbDeleteOutput()
			})
		},
		function deleteFunctions(cbDeleteFunctions) {
			db.collection('functions').deleteMany({}, null, function() {
				console.log('delete functions records completed')
				cbDeleteFunctions()
			})
		},
		function dropInputDataCollection(cbDropInputDataCollection) {
			db.dropCollection('inputData', function(err, result) {
				console.log('drop inputData collection completed')
				cbDropInputDataCollection()
			})
		},
		function dropScenarioCollection(cbDropScenarioCollection) {
			db.dropCollection('scenario', function(err, result) {
				console.log('drop scenario collection completed')
				cbDropScenarioCollection()
			})
		},
		function dropOutputCollection(cbDropOutputCollection) {
			db.dropCollection('output', function(err, result) {
				console.log('drop output collection completed')
				cbDropOutputCollection()
			})
		},
		function dropFunctionsCollection(cbDropFunctionsCollection) {
			db.dropCollection('functions', function(err, result) {
				console.log('drop functions collection completed')
				cbDropFunctionsCollection()
			})
		}
	], function(err) {
		db.close()
		console.log('disconnected from',dbName)
	})
})
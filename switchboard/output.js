var mongo = require('mongodb').MongoClient
var async = require('async')
var dbName = process.argv[2]
var url = 'mongodb://localhost:27017/'+dbName

mongo.connect(url, function(err, db) {
	console.log('connected to',dbName)
	var matchedDocs = []

	async.series([
		function getMatchedInputDocs(cbGetMatchedInputDocs) {
			db.collection('inputData').find({status:'matched', match:{$size:1}}).toArray(function(err,docs) {
				matchedDocs = docs
				cbGetMatchedInputDocs()
			})
		},
		function generateOutput(cbGenerateOutput) {
			async.forEach(matchedDocs, function forEachMatchedDoc(matchedDoc, cbForEachMatchedDoc) {

				// for each matched doc read associated scenario and get the output objects
				db.collection('scenario').findOne({name:matchedDoc.match[0]}, {fields:{output:1}}, function(err, doc) {

					// for each output object, write a record to the output collection
					async.forEach(doc.output, function forEachOutputDoc(outputDoc, cbForEachOutputDoc) {

						var processedOutput
						async.series([
							function getProcessedDoc(cbGetProcessedDoc) {
								processOutput(db,matchedDoc,outputDoc, function(result) {
									processedOutput = result
									cbGetProcessedDoc()
								})
							},
							function outputProcessedDoc(cbOutputProcessedDoc) {
								db.collection('output').insert(processedOutput, function(err, result) {
									cbOutputProcessedDoc()
								})
							}
						], function(err) {
							cbForEachOutputDoc()
						})

					}, function(err) {
						cbForEachMatchedDoc()
					})

				})

			}, function(err) {
				cbGenerateOutput()
			})
		},
		function updateInputDocStatus(cbUpdateInputDocStatus) {
			// update status
			db.collection('inputData').updateMany({match:{$size:1}}, {$set: {status: 'processed'}}, function(err, result) {
				console.log('processing',result.modifiedCount)
				cbUpdateInputDocStatus()
			})
		}
	], function(err) {
		db.close()
		console.log('disconnected from',dbName)
	})
})

function processOutput(db, inputDoc, outputDoc, callback) {
	
	async.forEach(Object.keys(outputDoc), function forEachField(key, cbForEachField) {

		// recursive async algorithm :-)
		evaluate(db, inputDoc, outputDoc[key], function(val) {
			outputDoc[key] = val
			cbForEachField()
		})

	}, function(err) {
		callback(outputDoc)
	})
}


function evaluate(db, inputDoc, outputValue, callback) {

	if (/^\@/.exec(outputValue)) {
		// console.log('function detected',outputValue)

		db.collection('functions').findOne({name:outputValue}, {}, function(err, doc) {

			if (doc.type === 'INPUT') {
				// console.log('required value is',inputDoc[doc.field])
				callback(inputDoc[doc.field])
			} else

			if (doc.type === 'MULTIPLY') {
				// get operands, multiply them together
				// an operand could be another function

				var vals = []
				async.forEach(doc.operands, function forEachOperand(operand, cbForEachOperand) {
					evaluate(db, inputDoc, operand, function(val) {
						vals.push(val)
						// console.log('operand',val)
						cbForEachOperand()
					})
				}, function(err) {
					// now multiply everything
					var total
					for (var v in vals) {
						if (total === undefined)
							total = vals[v]
						else
							total = total * vals[v]
					}
					callback(total)
				})

			} else

			if (doc.type === 'LOOKUP') {
				// retrieve a value from a reference table
				var flt = {}
				var lkpVal
				async.series([
					function resolveLookupFilters(cbResolveLookupFilters) {

						// console.log(doc.source.match)
						async.forEach(Object.keys(doc.source.match), function forEachMatchField(matchField, cbForEachMatchField) {
							// console.log('matchfield',matchField)
							evaluate(db, inputDoc, doc.source.match[matchField], function(val) {
								flt[matchField] = val
								cbForEachMatchField()
							})
						}, function(err) {
							cbResolveLookupFilters()
						})
					},
					function doLookup(cbDoLookup) {
						// console.log(flt)

						db.collection(doc.source.coll).findOne(flt, {}, function(err, ref) {
							// console.log(ref)
							lkpVal = ref[doc.source.ret]
							cbDoLookup()
						})
					}
				], function(err) {
					callback(lkpVal)
					// output actual lookup value here
				})

			} else
				callback(outputValue)
		})
	} else {
		callback(outputValue)
	}

}


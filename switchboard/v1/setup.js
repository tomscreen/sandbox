var mongo = require('mongodb').MongoClient
var async = require('async')
var dbName = process.argv[2]
var url = 'mongodb://localhost:27017/'+dbName

mongo.connect(url, function(err, db) {
	console.log('connected to',dbName)

	async.series([
		function createInputDataCollection(cbCreateInputDataCollection) {
			db.createCollection('inputData', function(err, collection) {
				console.log('create inputData collection completed')
				cbCreateInputDataCollection()
			})
		},
		function createScenarioCollection(cbCreateScenarioCollection) {
			db.createCollection('scenario', function(err, collection) {
				console.log('create scenario collection completed')
				cbCreateScenarioCollection()
			})
		},
		function createOutputCollection(cbCreateOutputCollection) {
			db.createCollection('output', function(err, collection) {
				console.log('create output collection completed')
				cbCreateOutputCollection()
			})
		},
		function createFunctionsCollection(cbCreateFunctionsCollection) {
			db.createCollection('functions', function(err, collection) {
				console.log('create functions collection completed')
				cbCreateFunctionsCollection()
			})
		},
		function createRefDataCollection(cbCreateRefDataCollection) {
			db.createCollection('refdata', function(err, collection) {
				console.log('create refdata collection completed')
				cbCreateRefDataCollection()
			})
		},
		function createInputDataRecords(cbCreateInputDataRecords) {
			db.collection('inputData').insertMany(generateInputDataRecords(), function(err, result) {
				console.log('create inputData records completed')
				cbCreateInputDataRecords()
			})
		},
		function createScenarioRecords(cbCreateScenarioRecords) {
			db.collection('scenario').insertMany(generateScenarioRecords(), function(err, result) {
				console.log('create scenario records completed')
				cbCreateScenarioRecords()
			})
		},
		function createFunctionsRecords(cbCreateFunctionsRecords) {
			db.collection('functions').insertMany(generateFunctionsRecords(), function(err, result) {
				console.log('create functions records completed')
				cbCreateFunctionsRecords()
			})
		},
		function createRefDataRecords(cbCreateRefDataRecords) {
			db.collection('refdata').insertMany(generateRefDataRecords(), function(err, result) {
				console.log('create refdata records completed')
				cbCreateRefDataRecords()
			})
		}
	], function(err) {
		db.close()
		console.log('disconnected from',dbName)
	})
})

function generateFunctionsRecords() {
	// These are the custom functions that will be interpreted when output records are created
	return [
		{name:"@SKU", type:"INPUT", field:"Material"},
		{name:"@SuppPlant", type:"INPUT", field:"ValA"},
		{name:"@TPC", type:"INPUT", field:"FYTotPrd"},
		{name:"@GS", type:"INPUT", field:"UoM"},
		{name:"@COCD", type:"INPUT", field:"CoCd"},
		{name:"@TPC100", type:"MULTIPLY", operands:[100,'@TPC']},
		{name:"@YCO100", type:"MULTIPLY", operands:[200,'@TPC100']},
		{name:"@CCC", type: 'LOOKUP', 
			source: {coll: 'refdata', match: {CompanyCode: '@COCD'}, ret: 'Currency'}}
	]
}

function generateScenarioRecords() {
	// These are the scenarios that will be used to identify input data records
	return [
		{name:'S1', criteria: {CoCd:'1110', ValA: {regex:/.*/}, Route:'PISA', StGsRaw:'ACTUALS', Source:'Default'},output: [
		{conditionType: 'VPRSS1', sku: '@SKU', companyCode: '1110', plant: '@SuppPlant', amount: '@TPC100',
		currency: '@CCC', per: '100', uom: '@GS', nonSapRel: 'x'}, {conditionType: 'YCO', sku: '@SKU',
		companyCode: '1110', plant: '@SuppPlant', amount: '@YCO100', currency: '@CCC', per: '100',
		uom: '@GS'}]},
		{name:'S2', criteria: {CoCd:'1234', ValA: {regex:/.+/}, Route:'PISA', StGsRaw:'ACTUALS', Source:'Default'},output: [
		{conditionType: 'VPRSS2', sku: '@SKU', companyCode: '1110', plant: '@SuppPlant', amount: '@TPC100',
		currency: '@CCC', per: '100', uom: '@GS', nonSapRel: 'x'}, {conditionType: 'YCO', sku: '@SKU',
		companyCode: '1110', plant: '@SuppPlant', amount: '@YCO100', currency: '@CCC', per: '100',
		uom: '@GS'}]},
		{name:'S3', criteria: {CoCd:'1234', ValA: {regex:/.*/}, Route:'PISA', StGsRaw:'ACTUALS', Source: {regex:/.+/}},output: [
		{conditionType: 'VPRSS3', sku: '@SKU', companyCode: '1110', plant: '@SuppPlant', amount: '@TPC100',
		currency: '@CCC', per: '100', uom: '@GS', nonSapRel: 'x'}, {conditionType: 'YCO', sku: '@SKU',
		companyCode: '1110', plant: '@SuppPlant', amount: '@YCO100', currency: '@CCC', per: '100',
		uom: '@GS'}]}
	]
}

function generateInputDataRecords() {
	// These are the input data records that will be identified by one (or more) scenarios
	return [
		{Material:'1', CoCd:'1110', ValA:'GA6', FisYear:'14', Route:'PISA', MType:'MFFG', 
		MaterialDescription:'Record 1', StGsRaw:'ACTUALS', Source:'Default', BotPerCase:'6', 
		Size:'700', LPerCase:'4.2', AgePerVin:'', Curr:'USD', FYTotPrd:'10', ConvFee:'0', CalcCost:'0', YCO:'0', 
		YVR:'0', DryGoods:'0', RCost:'0', Per:'1', UoM: 'CAS'}, // S1

		{Material:'2', CoCd:'1234', ValA:'CR2', FisYear:'14', Route:'PISA', MType:'MFFG', 
		MaterialDescription:'Record 2', StGsRaw:'ACTUALS', Source:'Default', BotPerCase:'6', 
		Size:'700', LPerCase:'4.2', AgePerVin:'', Curr:'USD', FYTotPrd:'20', ConvFee:'0', CalcCost:'0', YCO:'0', 
		YVR:'0', DryGoods:'0', RCost:'0', Per:'1', UoM: 'PER'}, // S2, S3

		{Material:'3', CoCd:'1234', ValA:'', FisYear:'14', Route:'PISA', MType:'MFFG', 
		MaterialDescription:'Record 2', StGsRaw:'ACTUALS', Source:'Default', BotPerCase:'6', 
		Size:'700', LPerCase:'4.2', AgePerVin:'', Curr:'USD', FYTotPrd:'30', ConvFee:'0', CalcCost:'0', YCO:'0', 
		YVR:'0', DryGoods:'0', RCost:'0', Per:'1', UoM: 'BOT'}, // S3 (Blank ValA)

		{Material:'4', CoCd:'1234', ValA:'DJ1', FisYear:'14', Route:'PISA', MType:'MFFG', 
		MaterialDescription:'Record 2', StGsRaw:'ACTUALS', BotPerCase:'6', 
		Size:'700', LPerCase:'4.2', AgePerVin:'', Curr:'USD', FYTotPrd:'40', ConvFee:'0', CalcCost:'0', YCO:'0', 
		YVR:'0', DryGoods:'0', RCost:'0', Per:'1', UoM: 'UN'}, // ORPHAN (No Source)

		{Material:'5', CoCd:'1234', ValA:'TD5', FisYear:'14', Route:'PISA', MType:'MFFG', 
		MaterialDescription:'Record 2', StGsRaw:'ACTUALS', Source:'Other', BotPerCase:'6', 
		Size:'700', LPerCase:'4.2', AgePerVin:'', Curr:'USD', FYTotPrd:'50', ConvFee:'0', CalcCost:'0', YCO:'0', 
		YVR:'0', DryGoods:'0', RCost:'0', Per:'1', UoM: 'IT'} // S3 (Source Other)
	]
}

function generateRefDataRecords() {
	// This is Master/Reference data collection to represent data that could come from another system
	// This could hold anything from Company records to Vendors or Tax Codes
	return [
		{CompanyCode:'1110', Currency:'USD'},
		{CompanyCode:'1234', Currency:'GBP'}
	]
}

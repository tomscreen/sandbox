var bl = require('bl');
var http = require('http');

var results = [];
var count = 0;

function logit(from, data) {
	if (count === 3) {
		// console.log("Logging from: "+from);
		results.forEach(function(item) {
			console.log(item);
		});
	}
}

http.get(process.argv[2], function(response) {
	response.pipe(bl(function(err,data) {
		// console.log("{1}: "+data.toString());
		results[0] = data.toString();
		count++;
		logit(0);
	}));
})

http.get(process.argv[3], function(response) {
	response.pipe(bl(function(err,data) {
		// console.log("{2}: "+data.toString());
		results[1] = data.toString();
		count++;
		logit(1);
	}));
})

http.get(process.argv[4], function(response) {
	response.pipe(bl(function(err,data) {
		// console.log("{3}: "+data.toString());
		results[2] = data.toString();
		count++;
		logit(2);
	}));
})

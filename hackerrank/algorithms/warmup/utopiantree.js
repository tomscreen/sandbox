'use strict';


function processData(input) {
	var parse_fun = function (s) { return parseInt(s, 10); };

	var lines = input.split('\n');
	var T = parse_fun(lines.shift());

	var data = lines.splice(0, T).map(parse_fun);

	// logic here
	for (var n in data) {
		var height = 1
		for (var i = 0; i<data[n]; i++) {
			if (i%2 === 0) height = 2*height
			else height += 1
		}
		process.stdout.write(height+'\n')
	}
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) { _input += input; });
process.stdin.on("end", function () { processData(_input); });

// starting cycle is spring (double in height has not yet happened)
// starting height is 1m
// N=0 starting height (1)
// N=1 double (2)
// N=2 add 1 (3)
// N=3 double (6)
// N=4 add 1 (7)
// N=5 double (14)
// N=6 add 1 (15)
// N=7 double (30)
// N=8 add 1 (31)
function getHeight(startingHeight, n) {
	var height = startingHeight
	console.log('starting height',startingHeight)
	for (var i = 0; i<n; i++) {
		if (i%2 === 0) {	// double
			console.log('double')
			height = 2*height
		} else { // add 1
			console.log('add 1')
			height += 1
		}
		console.log('it',i,'height',height)
	}
	return height
}
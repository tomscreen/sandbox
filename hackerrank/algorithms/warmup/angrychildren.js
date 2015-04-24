// function processData(input) {
//     var parse_fun = function (s) { return parseInt(s, 10) }
// 	var lines = input.split('\n')
// 	var T = parse_fun(lines.shift())
// 	var K = parse_fun(lines.shift())
// 	var data = lines.splice(0, T).map(parse_fun)

// 	// first thing, sort array so smallest number is on the left
// 	data.sort(function(a,b) {
// 		return a-b
// 	})
// 	console.log(data)

// 	var groupCount = 0
// 	var groups = data.reduce(function(p,c,idx,arr) {
// 		if (idx+K > arr.length) return p
// 		var group = arr.slice(idx,idx+K)
// 		var unfairness = group[K-1] - group[0]
// 		if (p.unfairness === undefined) p.unfairness = unfairness
// 		p.unfairness = (unfairness < p.unfairness) ? unfairness : p.unfairness

// 		return p
// 	},{})

// 	console.log(groups.unfairness)

// 	// so I need to select K numbers from data with minimum spread
// 	// then subtract smallest from largest to get unfairness value

// 	// get group of K numbers with lowest product, remove from data
// 	// repeat until no more groups available

// 	// find lowest number, shift to new array
// 	// find lowest number


// }

function processData(input) {
    var parse_fun = function (s) { return parseInt(s, 10) }
	var lines = input.split('\n')
	var T = parse_fun(lines.shift())
	var K = parse_fun(lines.shift())
	var data = lines.splice(0, T).map(parse_fun)

	data.sort(function(a,b) {
		return a-b
	})
	
	var groupCount = 0
	var groups = data.reduce(function(p,c,idx,arr) {
		if (idx+K > arr.length) return p
		var group = arr.slice(idx,idx+K)
		var unfairness = group[K-1] - group[0]
		if (p.unfairness === undefined) p.unfairness = unfairness
		p.unfairness = (unfairness < p.unfairness) ? unfairness : p.unfairness
		return p
	},{})

	process.stdout.write(groups.unfairness+'\n')
}



process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

function processData(input) {
    var parse_fun = function (s) { return parseInt(s, 10); };
	var lines = input.split('\n');
	var T = parse_fun(lines.shift());
	var data = lines.splice(0, T).map(parse_fun);

	var output = data.map(function(item) {
		var highest = 0
		var current = 1
		while (current <= (item/2)) {
			highest = (current*(item-current) > highest) ? current*(item-current) : highest
			current++
		}
		return highest
	})

	for (var o in output) {
    	process.stdout.write(output[o]+'\n')
    }
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

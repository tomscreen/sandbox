function processData(input) {
	var parse_fun = function (s) { return parseInt(s, 10) }
	var lines = input.split('\n')
	var T = parse_fun(lines.shift());
	var data = lines.splice(0, T).map(parse_fun);

	console.log(T,data)

	for (var d in data) {
		var groups = groupNumArrays(1,data[d],1000)

		asyncForEach(groups, function(group, groupCallback) {
			group.reduce(function(p,c) {

			},[])
			asyncForEach(group, function(num, numCallback) {

			}, function doneGroup() {

			})
		}, function doneGroups() {

		})
	}
	
}

function groupNumArrays(from,to,max) {
	var nums = []
	var groups = []
	for (var i=from;i<=to;i++) {
		nums = nums.concat(i)
		if (nums.length === max) {
			groups.push(nums)
			nums = []
		}
	}
	if (nums.length > 0) {
		groups.push(nums)
	}
	return groups
}

function asyncForEach(list, fn, callback) {
	var itemCount = 0
	list.forEach(function(item) {
		setTimeout(function() {
			fn(item, function() {
				itemCount++
				if (itemCount === list.length) callback()
			})
		})
	})
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

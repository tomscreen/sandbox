function processData(input) {
    var parse_fun = function (s) { return parseInt(s, 10) }
	var lines = input.split('\n')
	var p = parse_fun(lines.shift())
	var q = parse_fun(lines.shift())

	var nums = []
	var groups = []
	for (var i=p;i<=q;i++) {
		nums = nums.concat(i)
		if (nums.length === 1000) {
			groups.push(nums)
			nums = []
		}
	}
	if (nums.length > 0) {
		groups.push(nums)
	}
	var kaprekars = []
	asyncForEach(groups, function (group, groupCallback) {

		asyncForEach(group, function (num, callback) {
			if (isKaprekar(num)) {
				kaprekars.push(num)
			}
			callback()

		}, function whenAllDone() {
			groupCallback()
		})

	}, function allGroupsDone() {
		if (kaprekars.length > 0)
			for (var o in kaprekars)
				process.stdout.write(kaprekars[o]+' ')
		else
			process.stdout.write('INVALID RANGE')
	})
}

function isKaprekar(num) {
	if (num === 1) return true
	var cSqStr = Math.pow(num,2).toString()
	var i = Math.round(cSqStr.length/2)
	var rStr = cSqStr.substr(-i)
	var l = parseInt(cSqStr.substr(0,cSqStr.length-rStr.length),10)
	var r = parseInt(rStr,10)

	if (l>0 && r > 0) {
		if ((l+r) === num) {
			return true
		}
	}
	return false
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


// ** VERSION correct 7/8 - timeout.
//
// function processData(input) {
//     var parse_fun = function (s) { return parseInt(s, 10) }
// 	var lines = input.split('\n')
// 	var p = parse_fun(lines.shift())
// 	var q = parse_fun(lines.shift())

// 	var nums = []
// 	for (var i=p;i<=q;i++)
// 		nums = nums.concat(i)

// 	var output = nums.reduce(function(p,c) {
// 		if (c === 1) {
// 			p.push(1)
// 			return p
// 		}
// 		var cSqStr = (c*c).toString()
// 		var i = Math.round(cSqStr.length/2)
// 		var rStr = cSqStr.substr(-i)
// 		var l = parseInt(cSqStr.substr(0,cSqStr.length-rStr.length),10)
// 		var r = parseInt(rStr,10)

// 		if (l > 0 && r > 0) {
// 			if ((l+r) === c) {
// 				p.push(c)
// 				return p
// 			}
// 		}

// 		return p
// 	},[])

// 	if (output.length > 0)
// 		for (var o in output)
// 			process.stdout.write(output[o]+' ')
// 	else
// 		process.stdout.write('INVALID RANGE')
// }


// ** VERSION 1 - finds all Kaprekar numbers
// but incorrect according to instructions
//
// function processData(input) {
//     var parse_fun = function (s) { return parseInt(s, 10) }
// 	var lines = input.split('\n')
// 	var p = parse_fun(lines.shift())
// 	var q = parse_fun(lines.shift())

// 	console.log(p,q)

// 	var nums = []
// 	for (var i=p;i<=q;i++)
// 		nums = nums.concat(i)

// 	var k = nums.reduce(function(p,c) {
// 		var cSqStr = (c*c).toString()

// 		// console.log(cSqStr)
// 		// if this is split into two pieces
// 		// and the two pieces add up to 'c'
// 		// then it is a kaprekar number
// 		// the two pieces do not have to be equally split
// 		// each piece must be greater than 0
// 		for (var i=1;i<cSqStr.length;i++) {
// 			var l = parseInt(cSqStr.substr(0,i),10)
// 			var r = parseInt(cSqStr.substr(i),10)
// 			if (l > 0 && r > 0) {
// 				// console.log(l,r,l+r,c)
// 				if ((l+r) === c) {
// 					console.log("FOUND!",cSqStr,l,r,c)
// 					// found a k-num
// 					p.push(c)
// 					return p
// 				}
// 			} else
// 			if (r === 0) {
// 				// no point calculating any more for this number
// 				return p
// 			}
// 		}

// 		return p

// 	},[1])

// 	console.log(k)
// }

// function processData(input) {
// 	var parse_fun = function (s) { return parseInt(s, 10); };

// 	var lines = input.split('\n');
// 	var T = parse_fun(lines.shift());

// 	var data = lines.splice(0, T).map(parse_fun);
//     //Enter your code here

//     console.log(data)
//     var fibo = [0,1]	// seed

//     for (var i in data) {
//     	console.log('looking for',data[i])
//     	// console.log(fibo)
//     	if (fibo.indexOf(data[i]) === -1) {	// check in array already
//     		var x = 0
//     		var index = 2
//     		while (x < data[i]) {
//     			// console.log('x',x,', curr',data[i],', fibo',fibo[index])
//     			if (fibo[index] === undefined) {
//     				fibo[index] = fibo[index-1] + fibo[index-2]
//     				// console.log('adding',fibo)
//     			}
//     			x = fibo[index]
//     			index++
//     		}
//     		// console.log('nearest',x)
//     		// console.log(fibo)
//     		if (x === data[i]) {
//     			console.log(data[i],'is fibo')
//     		} else
//     			console.log(data[i],'is not fibo')
//     	} else {
//     		// is a fibo
//     		console.log(data[i],'is fibo (arr)')
//     	}
//     }
//     console.log(fibo)
// } 

function processData(input) {
	var parse_fun = function (s) { return parseInt(s, 10); };
	var lines = input.split('\n');
	var T = parse_fun(lines.shift());
	var data = lines.splice(0, T).map(parse_fun);

    var fibo = [0,1]	// fibonacci seed
    for (var i in data) {
    	if (fibo.indexOf(data[i]) === -1) {	// check in array already
    		var x = 0
    		var index = 2
    		while (x < data[i]) {
    			if (fibo[index] === undefined) {	// add to array
    				fibo[index] = fibo[index-1] + fibo[index-2]
    			}
    			x = fibo[index]
    			index++
    		}
    		if (x === data[i])
    			process.stdout.write('IsFibo\n')
    		else
    			process.stdout.write('IsNotFibo\n')
    	} else {
    		// is a fibo (found in array)
    		process.stdout.write('IsFibo\n')
    	}
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

/*

f(0) = 0
f(1) = 1
f(2) = 1
f(3) = 2
f(4) = 3
f(5) = 5
f(6) = 8
f(7) = 13
f(8) = 21
f(9) = 34

f(n) = f(n-1) + f(n-2)


isfibo(56) {
	
	if f(n) = 56 true
	else false

}

// either, count up to and past the target number (brute force)
// or...?


*/
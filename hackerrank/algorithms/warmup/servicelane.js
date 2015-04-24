// function processData(input) {
// 	var lines = input.split('\n')
// 	var meta = lines.shift().split(' ')
// 	var freewayLength = meta[0]
// 	var numberOfTestCases = meta[1]
// 	var freewayWidthArr = lines.shift().split(' ')
// 	var testCases = lines.splice(0,numberOfTestCases)
// 	testCases = testCases.map(function(testCase) {
// 		return testCase.split(' ')
// 	})

// 	console.log('freeway length',freewayLength)
// 	console.log('number of test cases',numberOfTestCases)
// 	console.log('freeway widths',freewayWidthArr)

	
//     //Enter your code here
//     console.log(testCases)

//     var output = testCases.reduce(function(p,c) {
//     	// c => 4,6, for example
//     	// console.log('c',c)
//     	// console.log('slice',freewayWidthArr.slice(c[0],parseInt(c[1])+1))

//     	console.log('c',c)
//     	p = p.concat(freewayWidthArr.slice(c[0],parseInt(c[1])+1).reduce(function(pr,cu,id,sla) {
//     		if (pr[0] === undefined) pr[0] = cu
//     		else pr[0] = (cu<pr[0]) ? cu : pr[0]
//     		console.log('sliced',pr,cu,sla)
//     		return pr
//     	},[]))
//     	console.log('p',p)

//     	return p
//     },[])

//     console.log(output)
// }

function processData(input) {
	var lines = input.split('\n')
	var meta = lines.shift().split(' ')
	var freewayLength = meta[0]
	var numberOfTestCases = meta[1]
	var freewayWidthArr = lines.shift().split(' ')
	var testCases = lines.splice(0,numberOfTestCases)
	testCases = testCases.map(function(testCase) {
		return testCase.split(' ')
	})

	var output = testCases.reduce(function(p,c) {
    	p = p.concat(freewayWidthArr.slice(c[0],parseInt(c[1])+1).reduce(function(pr,cu) {
    		if (pr[0] === undefined) pr[0] = cu
    		else pr[0] = (cu<pr[0]) ? cu : pr[0]
    		return pr
    	},[]))
    	return p
    },[])

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

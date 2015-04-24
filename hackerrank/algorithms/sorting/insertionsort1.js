function processData(input) {
    var lines = input.split('\n')
	var s = lines.shift()
	var arr = lines.shift().split(' ')

	insertionSort(arr, s-1)
}

function insertionSort(arr, index) {
	var v = parseInt(arr[index])
	var done
	return function sortOne(arr, index) {
		if (arr[index-1] > v) {
			arr[index] = arr[index-1]
		} else
		if (arr[index-1] <= v) {
			arr[index] = v
			outputLine(arr)
			done = true
			return arr
		} else
		if (index === 0) {
			arr[0] = v
			outputLine(arr)
			return arr
		}
		outputLine(arr)
		return sortOne(arr,index-1)
	}(arr,index)
}

function outputLine(arr) {
	for (var i in arr) {
		process.stdout.write(arr[i]+' ')
	}
	process.stdout.write('\n')
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


// ** VERSION 2
// function insertionSort(arr, index) {
// 	var v = parseInt(arr[index])
// 	var done
// 	return function sortOne(arr, index) {
// 		if (arr[index-1] > v) {
// 			arr[index] = arr[index-1]
// 		} else
// 		if (arr[index-1] <= v) {
// 			arr[index] = v
// 			outputLine(arr)
// 			done = true
// 			return arr
// 		} else
// 		if (index === 0) {
// 			arr[0] = v
// 			outputLine(arr)
// 			return arr
// 		}
// 		outputLine(arr)
// 		return sortOne(arr,index-1)
// 	}(arr,index)
// }


// ** ORIGINAL
// function insertionSort(arr, index) {
// 	var v = parseInt(arr[index])
// 	var done
// 	// console.log(v,arr)
// 	return function sortOne(arr, index) {
// 		// console.log('before',arr,index)
// 		if (index-1 < 0) {
// 			if (!done) {
// 				arr[1] = arr[0]
// 				arr[0] = v
// 			}
// 			return arr
// 		}

// 		if (arr[index-1] > v) {
// 			arr[index] = arr[index-1]
// 			// arr[index] = v
// 			// console.log('moving')
// 		} else
// 		if (arr[index-1] <= v) {
// 			arr[index] = v
// 			// done
// 			// console.log('inserting')
// 			// console.log('after ',arr,index)
// 			outputLine(arr)
// 			return arr
// 		}
// 		// console.log('after ',arr,index)
// 		outputLine(arr)
// 		return sortOne(arr,index-1)
// 	}(arr,index)
// }

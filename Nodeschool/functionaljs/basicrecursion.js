module.exports = function reduce(arr, fn, initial) {
	return function reduceOne(initial, idx) {
		if (idx === arr.length) return initial
		return reduceOne(fn(initial,arr[idx],idx,arr), ++idx)
	}(initial,0)
}

// var input = [ 'adipisicing', 'nostrud', 'amet', 'ex', 'magna', 
// 'excepteur', 'magna', 'eu', 'incididunt', 'ullamco', 'consectetur', 
// 'officia', 'occaecat', 'aute', 'cillum', 'ullamco', 'amet', 'occaecat', 
// 'quis', 'commodo', 'labore', 'commodo', 'qui', 'reprehenderit', 'enim', 
// 'veniam', 'nulla', 'sunt', 'id', 'id', 'deserunt', 'reprehenderit', 
// 'minim', 'nisi', 'veniam', 'consequat', 'est', 'aute', 'reprehenderit' ]

// console.log(reduce(input, myred, {}))
// console.log(input)

// function myred(initial, item, index, arr) {
// 	initial[item] = ++initial[item] || 1
// 	return initial
// }
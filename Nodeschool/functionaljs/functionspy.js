module.exports = function Spy(target, method) {
	var d = {count:0}
	var origMethod = target[method]
	target[method] = function() {
		d.count++
		return origMethod.apply(target, arguments)
	}
	return d
}

// var spy = Spy(console, 'error')

// console.error('calling 1')
// console.error('calling 2')
// console.error('calling 3')
// console.error('calling 3')
// console.error('calling 3')
// console.error('calling 3')

// console.log(spy.count)

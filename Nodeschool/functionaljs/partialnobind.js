module.exports = function logger(namespace) {
	return function() {
		var args = Array.prototype.slice.call(arguments)
		args.splice(0,0,namespace)
		console.log.apply(null, args)
	}
}

// var info = logger('info')
// var warn = logger('warn')
// console.log(info)
// logger('hello', 'this', 'is', 'me')

// info('hello')

// function logger(namespace) {
// 	console.log.apply(null, [namespace])
// }

// var info = logger('somens')
// console.log(info)

// var info = console.log.apply(null, ['hello'])
// info('tom')
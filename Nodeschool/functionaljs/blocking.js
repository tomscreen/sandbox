module.exports = function repeat(operation, num) {
	setImmediate(function() {
		if (num <= 0) return
		operation()
		return repeat(operation, --num)
	})
}
module.exports = function duckCount() {
	return Array.prototype.reduce.call(arguments, function(p,c) {
		if (Object.prototype.hasOwnProperty.call(c, 'quack')) p++
		return p
	}, 0)
}
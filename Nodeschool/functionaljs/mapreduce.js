module.exports = function arrayMap(arr, fn) {
	return arr.reduce(function(p,c) {
		p.push(fn(c))
		return p
	},[])
}
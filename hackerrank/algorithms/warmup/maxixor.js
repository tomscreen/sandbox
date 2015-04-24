function maxiXor(l,r) {
	var m = 0
	for (var i=l; i<=r; i++) {
		for (var j=l; j<=r; j++) {
			var x = i^j
			m = x>m ? x : m
		}
	}
	return m
}

console.log(maxiXor(5,76))
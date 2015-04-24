z = ""
M = Math.pow
process.stdin.on("data", function(i) {z+=i})
process.stdin.on("end", function() {
	z = z.split('\n')
	z = z.splice(0,z.shift())
	for (l in z) {
		console.log(r(1,4,parseFloat(z[l]),parseFloat(z[l]),1,-1,1).toFixed(3))
    	console.log(r(1,4,parseFloat(z[l]),1,1,-1,0).toFixed(3))
	}

	// // console.log(s(5.04))
	// // console.log('*** THEN ***')
	// // console.log(r(1,4,5.04,5.04,1,-1,1))

	// console.log(c(5.04))
	// console.log('*** THEN ***')
	// console.log(r(1,4,5.04,1,1,-1,0).toFixed(3))
})

function c(x) {
	var c = 1
	c = c - ( M(x,2) / (2*1) )
	c = c + ( M(x,4) / (4*3*2*1) )
	c = c - ( M(x,6) / (6*5*4*3*2*1) )
	c = c + ( M(x,8) / (8*7*6*5*4*3*2*1) )
	return c.toFixed(3)
}

function s(x) {
	var s = x
	console.log('loop 0',s)
	s = s - ( M(x,3) / (3*2*1) )
	console.log('loop 1',s,M(x,3),( M(x,3) / (3*2*1) ))
	s = s + ( M(x,5) / (5*4*3*2*1) )
	console.log('loop 2',s)
	s = s - ( M(x,7) / (7*6*5*4*3*2*1) )
	console.log('loop 3',s)
	s = s + ( M(x,9) / (9*8*7*6*5*4*3*2*1) )
	console.log('loop 4',s)
	return s.toFixed(3)
}

function r(count,max,x,s,f,t,o) {
	y = ((count*2)+o)
	// console.log('loop',count,x,s,y,f)
	// console.log('+/-',M(t,count))
	// console.log('exp',M(x,y))
	// console.log('fact',((y)*(y-1)*f))
	// console.log(M(t,count) * ( M(x,y) / ((count+2)*(count+1)*f) ))
	f = ((y)*(y-1)*f) 
	s = s + ( M(t,count) * (M(x,y) / f) )
	// console.log('s=',s)
	return (count<max) ? r(++count,max,x,s,f,t,o) : s
}
function repeat(operation, num) {
	if (num-- > 0) operation()
	else return 
	repeat(operation,num)
}
    
// Do not remove the line below
module.exports = repeat
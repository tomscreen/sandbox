module.exports = function countWords(inputWords) {
	return inputWords.reduce(function(prevValue, currValue) {
		prevValue[currValue] = (prevValue[currValue]+1) || 1
		return prevValue
	}, {})
}
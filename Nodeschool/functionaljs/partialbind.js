module.exports = function logger(namespace) {
	return console.log.bind(null, namespace)
}
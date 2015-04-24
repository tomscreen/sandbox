module.exports = function checkUsersValid(goodUsers) {
	return function testUsers(submittedUsers) {
		return submittedUsers.every(function(submitted) {
			return goodUsers.some(function(good) {
				return submitted.id === good.id
			})
		})
	}
}
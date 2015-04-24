// module.exports = function loadUsers(userIds, load, done) {
// 	var track = 0
// 	var users = []
// 	userIds.forEach(function(userId, index) {
// 		track++
// 		load(userId, function(loadedUser) {
// 			users[index] = loadedUser
// 			if (--track === 0) done(users)
// 		})
// 	})
// }

module.exports = function loadUsers(userIds, load, done) {
	var track = 0
	return function loadOne(index, users) {
		track++
		load(userIds[index], function(loadedUser) {
			users[index] = loadedUser
			if (--track === 0) done(users)
		})

		if (index < userIds.length-1)
			return loadOne(index+1, users)

	}(0,[])
}

// module.exports = function loadUsers(userIds, load, done) {
// 	console.log(userIds)
// 	return function loadOne(index, users, cbFinished) {
// 		console.log('here',index)
		
// 		load(userIds[index], function(user) {
// 			users[index] = user
// 			cbFinished(users)
// 		})

// 		if (index < userIds.length)
// 			return loadOne(index+1, users, function(us) {
// 				return us
// 			})

// 	}(0,[],function finished(users) {
// 		console.log('finished',users)
// 		done(users)
// 	})
// }
	

	// userIds.forEach(function(uid) {
	// 	load(uid, function(user) {
	// 		users.push(user)
	// 		if (users.length === userIds.length)
	// 			done(users)
	// 	})
	// })

	// var m = userIds.map(function(item) {
	// 	var u = {}
	// 	load(item, function(user) {
	// 		console.log(user)
	// 		u.id = user.id
	// 		u.name = user.name
	// 	})
	// 	return u
	// })

	// done(m)

	// console.log(userIds.map(function(item) {
	// 	return load(item, function(user) {
	// 		return user
	// 	})
	// }))

	// console.log(userIds)
	// load(userIds[0], function(u) {
	// 	console.log(u)
	// })
	// var users = []
	// for (var i = 0; i < userIds.length; i++) {
	// 	users.push(load(userIds[i]))
	// }
	// done(userIds)
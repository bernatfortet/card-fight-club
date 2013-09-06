Meteor.publish( 'users', ->
	return Meteor.users.find()
)

Meteor.publish( 'matches', ->
	return Matches.find()
)

Meteor.publish( 'userStatus', ->
	return Meteor.users.find { "profile.online": true }
)

UserStatus.on "sessionLogin", (userId, sessionId, ipAddr) ->
	console.log(userId + " with session " + sessionId + " logged in from " + ipAddr)

UserStatus.on "sessionLogout", (userId, sessionId) ->

	console.log(userId + " with session " + sessionId + " logged out")

	# Remove user from current Match
	# TODO move to Methods
	matchUserisIn = Matches.findOne({ users: userId } )


	if( matchUserisIn )
		console.log matchUserisIn
		updateMatch = Matches.update( matchUserisIn, { $pull: { "users": userId } } )

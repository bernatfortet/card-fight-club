Meteor.publish( 'users', ->
	return Meteor.users.find()
)

Meteor.publish( 'matches', ->
	return Matches.find()
)

Meteor.publish( 'decks', ->
	return Decks.find()
)

Meteor.publish( 'userStatus', ->
	return Meteor.users.find { "profile.online": true }
)

UserStatus.on "sessionLogin", (userId, sessionId, ipAddr) ->
	#console.log(userId + " with session " + sessionId + " logged in from " + ipAddr)

UserStatus.on "sessionLogout", (userId, sessionId) ->
	#console.log(userId + " with session " + sessionId + " logged out")
	matchesController.leaveAllMatches( userId )


Meteor.startup( ->

)
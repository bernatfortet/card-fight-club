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
	#console.log(userId + " with session " + sessionId + " logged in from " + ipAddr)

UserStatus.on "sessionLogout", (userId, sessionId) ->

	#console.log(userId + " with session " + sessionId + " logged out")

	# Remove user from current Match
	# TODO move to Methods
	matchUserisIn = Matches.findOne({ users: userId } )
	matchesController.leaveAllMatches()


Meteor.startup( ->
	this.matchesController = new MatchesController()

	chatStream.permissions.write (eventName) ->
		userId = this.userId
		subscriptionId = this.subscriptionId

		#console.log Meteor.users.findOne( userId )._id
		console.log subscriptionId

		#return true to accept and false to deny
		true

)


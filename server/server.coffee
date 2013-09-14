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
	this.matchesController = new MatchesController()

	matchesStream.permissions.read ( ( eventName, params ) ->
		switch eventName
			when 'onChallenge'
				if( params.challengedUserId == this.userId ) then true else false
			when 'challengeAccepeted'
				if( params.player == this.userId ) then true else false
				return true
			when 'onStartMatch'
				if( params.player0._id == this.userId || params.player1._id == this.userId ) then true else false
			else
				return true

	), false

	matchesStream.permissions.write ( event, params ) ->
		console.log 'writing', event, params
		true

)
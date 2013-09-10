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
	matchesController.leaveAllMatches( userId )


Meteor.startup( ->
	this.matchesController = new MatchesController()

	matchesStream.on "challengeAccepeted", ( params ) ->
		console.log 'Challenge Accepted', params
		createdMatchId = matchesController.createMatch()
		matchesController.joinMatch( createdMatchId, params.challengerUserId )
		matchesController.joinMatch( createdMatchId, params.challengedUserId )



	matchesStream.permissions.read ( ( eventName, params ) ->
		switch eventName
			when 'onChallenge'
				if( this.userId == params.challengedUserId )
					return true
				else
					return false
			when 'challengeAccepeted'
				if( this.userId == params.challengedUserId || this.userId == params.challengerUserId )
					return true
				else
					return false
				return true
			else
				return true

		#console.log 'subscriptionId', this.subscriptionId
		#console.log "user: ", params
		#console.log "currentUserId: ", this.userId

	), false

	matchesStream.permissions.write ( event, params ) ->
		console.log 'writing', event, params
		true


)

tutor = Meteor.require('tutor');
###
Meteor.methods

	getCard: () ->
		Meteor.setTimeout( ->
			return _card

		,2000)

		_card = null
		tutor.card( 123123, ( err, card ) =>
			#console.log card
			_card = card.name
		)
###

Future = Meteor.require("fibers/future")


Meteor.Router.add(
	"/api/v1/cards/:id.json", ( cardId ) ->

		future = new Future();
		card = {}

		Meteor.setTimeout( =>
			console.log card
			return future.return( 'asdf' )
			#console.log 'asdf1'
			#return 'asdf123'
			#this.response.write(['asdf','asdf'])
		, 100)

		return future.wait();
		tutor.card( cardId, ( err, respone ) =>
			card = respone
		)

		#console.log theCard
)

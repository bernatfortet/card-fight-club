Meteor.methods

	createMatchAndJoin: () ->
		matchesController.createMatchAndJoin()

	joinMatch: ( match_id ) ->
		matchesController.joinMatch(  match_id, Meteor.userId() )



class @MatchesController

	states:
		empty: 		'empty'
		filling: 	'filling'
		full: 		'full'
		playing: 	'playing'
		finished: 	'finished'

	openMatches: null

	constructor: ->
		#console.log 'Matches Controller init'

		this.setListeners()

	setListeners: ->

		matchesStream.on "challengeAccepeted", ( params ) ->
			#console.log 'Challenge Accepted', params
			createdMatchId = matchesController.createMatch()
			matchesController.joinMatch( createdMatchId, params.challengerUserId )
			matchesController.joinMatch( createdMatchId, params.challengedUserId )
			matchesStream.emit( 'challengeAccepeted', params )


	createMatch: ->
		match_id = Matches.insert( name: 'test', state: this.states.filling )

	joinMatch: ( match_id, user_id ) ->
		console.log user_id, ' - is joingMatch - can be joined?',  this.matchCanBeJoined( match_id ) 
		if( this.matchCanBeJoined( match_id ) )
			Matches.update( match_id, $addToSet: { users: user_id } )
			Meteor.users.update( user_id, $set: { currentMatchId: match_id })

			this.leaveOtherMatches( user_id )

			console.log 'is match Full? ', this.checkIfMatchIsFull( match_id )

			if( this.checkIfMatchIsFull( match_id ) )
				this.setMatchState( match_id, this.states.full  )
				this.startMatch( match_id )
		else
			console.log 'Match is Full'
			# Match Is full

	createMatchAndJoin: ->
		console.log 'Creating Match and joining'
		createdMatchId = this.createMatch()
		this.joinMatch( createdMatchId, Meteor.userId() )	

	startMatch: ( match_id ) ->
		this.setMatchState( match_id, this.states.playing )
		users = Matches.findOne( match_id ).users
		params =
			player0: Meteor.users.findOne( users[0] )
			player1: Meteor.users.findOne( users[1] )
			match: match_id

		matchesStream.emit('onStartMatch', params )


	matchCanBeJoined: ( match_id ) ->
		matchState = this.getMatchState( match_id )

		if( matchState == this.states.empty || matchState == this.states.filling )
			return true
		else
			return false
	
	checkIfMatchIsFull: ( match_id ) ->
		usersInMatch = Matches.findOne({ _id: match_id } ).users.length
		if( usersInMatch >= 2 )
			return true
		else
			return false

	checkIfMatchIsPlaying: ( match_id ) ->
		match = Matches.findOne({ _id: match_id } )
		usersInMatch = match.users.length
		if( usersInMatch < 2  && match.state == this.states.playing  )
			return true
		else
			return false

	setMatchState: ( match_id, state ) ->
		Matches.update( match_id, { $set: { "state": state } } )

	getMatchState: ( match_id ) ->
		Matches.findOne( match_id ).state


	leaveOtherMatches: ( user_id ) ->
		console.log user_id
		matchesUserisIn = Matches.find({ users: user_id } ).fetch()

		for match in matchesUserisIn
			userCurrentMatchId = Meteor.users.findOne( user_id, { currentMatchId: match._id }).currentMatchId
			if( match._id != userCurrentMatchId )
				this.leaveMatch( match._id )

	leaveAllMatches: ( user_id ) ->
		matchesUserisIn = Matches.find({ users: user_id } ).fetch()

		for match in matchesUserisIn
			this.leaveMatch( match._id, user_id )

	leaveMatch: ( match_id, user_id ) ->
		Matches.update( match_id, { $pull: { "users": user_id } } )
		
		updatedMatch = Matches.findOne({ _id: match_id } )

		if( updatedMatch.users.length == 0 )
			Matches.remove({ _id: match_id } )
Meteor.methods

	createMatch: ( match_id ) ->
		matchesController.createMatch(  match_id )


	joinMatch: ( match_id ) ->
		matchesController.joinMatch(  match_id )



class @MatchesController

	states:
		empty: 		'empty'
		filling: 	'filling'
		full: 		'full'
		playing: 	'playing'
		finished: 	'finished'

	constructor: ->
		#console.log 'Matches Controller init'

	createMatch: ( match_id ) ->
		match_id = Matches.insert( name: 'test', users: [ Meteor.userId() ], state: this.states.filling )
		this.joinMatch( match_id )


	joinMatch: ( match_id ) ->
		if( this.matchCanBeJoined( match_id ) )
			Matches.update(match_id, $addToSet: { users: Meteor.userId() } )

			Meteor.users.update( Meteor.userId(), $set: { currentMatchId: match_id })
			this.leaveOtherMatches()

			if( this.checkIfMatchIsFull( match_id ) )
				this.setMatchState( match_id, this.states.full  )
				console.log 'Two users in match! sending them a lovely message'
		else
			console.log 'Match is Full'
			# Match Is full


	matchCanBeJoined: ( match_id ) ->
		matchState = this.getMatchState( match_id )
		console.log 'matchState', matchState

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
		usersInMatch = Matches.findOne({ _id: match_id } ).users.length
		if( usersInMatch <= 2 )
			return true
		else
			return false

	setMatchState: ( match_id, state ) ->
		Matches.update( match_id, { $set: { "state": state } } )

	getMatchState: ( match_id ) ->
		Matches.findOne( match_id ).state


	leaveOtherMatches: ->
		matchesUserisIn = Matches.find({ users: Meteor.userId() } ).fetch()

		for match in matchesUserisIn
			usersCurrentMatchId = Meteor.users.findOne( Meteor.userId(), { currentMatchId: match._id }).currentMatchId
			if( match._id != usersCurrentMatchId )
				this.leaveMatch( match._id )

	leaveAllMatches: ->
		matchesUserisIn = Matches.find({ users: Meteor.userId() } ).fetch()

		for match in matchesUserisIn
			this.leaveMatch( match._id )

	leaveMatch: ( match_id ) ->
		Matches.update( match_id, { $pull: { "users": Meteor.userId() } } )
		
		updatedMatch = Matches.findOne({ _id: match_id } )
		#console.log updatedMatch

		if( updatedMatch.users.length == 0 )
			Matches.remove({ _id: match_id } )
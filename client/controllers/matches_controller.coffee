class @MatchesController

	constructor: ->

		Template.matches_list.matches = ->
			Matches.find()
			
		this.setListeners()


	setListeners: ->
		Template.matches_list.events(
			'click #CreateMatch' : =>
				match_id = $(event.currentTarget).attr('id')
				this.createMatch( match_id )

			'click .JoinMatch' : (event) =>
				match_id = $(event.currentTarget).attr('id')
				this.joinMatch( match_id )
		)

	createMatch: ( match_id ) ->
		#if( Session.get('currentMatchId' ) != null )

		match_id = Matches.insert( name: 'test', users: [ Meteor.userId() ] )
		Session.set('currentMatchId', match_id )
		this.joinMatch( match_id )

		this.leaveOtherMatches()


	joinMatch: ( match_id ) ->
		#this.leaveOtherMatches()

		Matches.update(match_id, $addToSet: { users: Meteor.userId() } )
		Session.set( 'currentMatchId', match_id )
		console.log 'Joining Match:', match_id

		this.leaveOtherMatches()

	
	
	leaveOtherMatches: ->
		#db.matches.find( {"users": 'ockgnEpfsBPAR4fDf'} )

		matchesUserisIn = Matches.find({ users: Meteor.userId() } ).fetch()

		for match in matchesUserisIn

			if( match._id != Session.get( 'currentMatchId' ) )

				Matches.update( match._id, { $pull: { "users": Meteor.userId() } } )

				updatedMatch = Matches.findOne({ _id: match._id } )
				if( updatedMatch.users.length == 0 )
					 Matches.remove({ _id: match._id } )
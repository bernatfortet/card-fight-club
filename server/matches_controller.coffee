Meteor.methods

	createMatch: ( match_id ) ->
		match_id = Matches.insert( name: 'test', users: [ Meteor.userId() ] )
		Meteor.call( 'joinMatch', match_id )


	joinMatch: ( match_id ) ->
		Matches.update(match_id, $addToSet: { users: Meteor.userId() } )

		Meteor.users.update( Meteor.userId(), $set: { currentMatchId: match_id })
		Meteor.call( 'leaveOtherMatches' )
	

	leaveOtherMatches: ->
		matchesUserisIn = Matches.find({ users: Meteor.userId() } ).fetch()

		for match in matchesUserisIn
			usersCurrentMatchId = Meteor.users.findOne( Meteor.userId(), { currentMatchId: match._id }).currentMatchId
			if( match._id != usersCurrentMatchId )
				Meteor.call( 'leaveMatch', match._id )

	leaveAllMatches: ->
		matchesUserisIn = Matches.find({ users: Meteor.userId() } ).fetch()

		for match in matchesUserisIn
			Meteor.call( 'leaveMatch', match._id )

	leaveMatch: ( match_id ) ->
		Matches.update( match_id, { $pull: { "users": Meteor.userId() } } )
		
		updatedMatch = Matches.findOne({ _id: match_id } )
		console.log updatedMatch

		if( updatedMatch.users.length == 0 )
			Matches.remove({ _id: match_id } )

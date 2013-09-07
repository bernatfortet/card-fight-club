Meteor.methods

	createMatch: ( match_id ) ->
		match_id = Matches.insert( name: 'test', users: [ Meteor.userId() ] )
		Meteor.call( 'joinMatch', match_id )


	joinMatch: ( match_id ) ->
		Matches.update(match_id, $addToSet: { users: Meteor.userId() } )

		Meteor.users.update( Meteor.userId(), $set: { currentMatchId: match_id })
		Meteor.call( 'leaveOtherMatches' )
	

	leaveOtherMatches: ->
		#db.matches.find( {"users": 'ockgnEpfsBPAR4fDf'} )

		matchesUserisIn = Matches.find({ users: Meteor.userId() } ).fetch()

		for match in matchesUserisIn

			console.log '---------'
			console.log match._id
			console.log Meteor.users.findOne( Meteor.userId(), { currentMatchId: match._id }).currentMatchId 

			console.log '---------'

			if( match._id != Meteor.users.findOne( Meteor.userId(), { currentMatchId: match._id }).currentMatchId )

				Matches.update( match._id, { $pull: { "users": Meteor.userId() } } )

				updatedMatch = Matches.findOne({ _id: match._id } )
				console.log updatedMatch

				if( updatedMatch.users.length == 0 )
					Matches.remove({ _id: match._id } )

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
		Session.set( 'currentMatchId', match_id )
		Meteor.call( 'createMatch', match_id )


	joinMatch: ( match_id ) ->
		Session.set( 'currentMatchId', match_id )
		Meteor.call( 'joinMatch', match_id )
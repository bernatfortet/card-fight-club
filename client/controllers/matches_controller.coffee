class @MatchesController

	constructor: ->

		Template.matches_list.matches = ->
			Matches.find()
			
		this.setListeners()



	setListeners: ->
		console.log 'settings listeners'

		Template.matches_list.events(
			'click #CreateMatch' : =>
				match_id = $(event.currentTarget).attr('id')
				this.createMatch()

			'click .JoinMatch' : (event) =>
				match_id = $(event.currentTarget).attr('id')
				this.joinMatch( match_id )
		)

		matchesStream.on "onStartMatch", this.onStartMatch



	createMatch: ->
		Session.set( 'currentMatchId' )
		Meteor.call( 'createMatchAndJoin' )


	joinMatch: ( match_id ) ->
		Session.set( 'currentMatchId', match_id )
		Meteor.call( 'joinMatch', match_id )

	onStartMatch: ( params ) ->
		Session.set('section', 'SectionMatch')
		console.log 'params', params
		

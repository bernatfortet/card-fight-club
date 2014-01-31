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

		#Set OpponentId to the user who is not the sender of the event
		console.log  'SettingOpponentId', Meteor.userId(), params.player0, Meteor.userId() == params.player0 
		if( Meteor.userId() == params.player0._id )
			opponent = params.player1
		else
			opponent = params.player0

		Session.set( 'opponent', opponent )
		app.prepareGame()
		

Meteor.startup( ->
	this.gamesController = new GamesController()

	gameStream.permissions.read ( ( eventName, params ) ->
		console.log 'Receiving Event | OpponentId: ', params.opponentId, ' | userId: ', this.userId, ' | ', params.opponentId == this.userId
		if( params.opponentId == this.userId ) then true else false
	), false

	gameStream.permissions.write ( event, params ) ->
		true

)

class @GamesController

	constructor: ->

		this.setListeners()

	setListeners: ->
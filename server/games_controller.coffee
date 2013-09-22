Meteor.startup( ->
	this.gamesController = new GamesController()

	gameStream.permissions.read ( ( eventName, params ) ->
		console.log 'EventName: ', eventName, 'Params: ', params
	), false

	gameStream.permissions.write ( event, params ) ->
		true

)

class @GamesController

	constructor: ->

		this.setListeners()

	setListeners: ->
class NetworkController extends Spine.Controller
	local = true

	constructor: ->
		super
		this.server = io.connect('http:'+serverIp+':8080')
		this.setListeners()

	setListeners: () ->
		this.server.on 'onUserJoinsRoom', 		this.onUserJoinsRoom


	onReady: ->
		this.onConnect()

	#Senders
	onConnect: ->
		params =
			roomId: "1"

		console.log("OnConnect", params );
		this.sendEvent( "onConnect", params )

		this.onUserJoinsRoom( params ) if localServer

	#Receivers
	onUserJoinsRoom: ( data ) ->
		console.log( "onUserJoinsRoom", data );
		app.startGame()

	sendEvent: ( event, params ) ->
		params.userId = User.first().id
		this.server.emit( event, params ) if !localServer

class NetworkInputController extends InputController
	constructor: ->
		super

		#this.server = io.connect('http:localhost:8080')

		this.setListeners()

	setListeners: () ->

		#this.server.on("test", this.onTest )

	onTest: () =>
		console.log("on test");


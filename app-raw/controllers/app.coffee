class App extends Spine.Controller

	constructor: ->
		super
		#this.networkController = new NetworkController
		this.gameController = new GameController()
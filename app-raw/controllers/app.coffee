class App extends Spine.Controller

	userInfo: null

	constructor: ->
		super
		#this.networkController = new NetworkController
		this.gameController = new GameController()
		this.dbController = new DBController()
		this.initialize()

	initialize: ->
		this.dbController.getUserInfo()

	createUser: ( userData, deckData  ) ->
		User.create({ name: userData.name, deck: deckData })
		this.gameController.initialize()
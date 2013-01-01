class App extends Spine.Controller

	userInfo: null
	serverIp: "25.175.254.163"

	constructor: ->
		super

	initialize: ->
		this.gameController = new GameController()
		this.dbController = new DBController()

		deckId = prompt("Insert Deck Id","");
		#deckId = "50df4fe8e4b0d84e5fee60ad"
		this.dbController.getDeckFromMongoLab( deckId )

	createUser: ( userData, deckData  ) ->
		randomId = Math.floor( Math.random() * 1000 )
		User.create({ id: randomId,  name: "pepito", deck: deckData })
		this.gameController.initialize()
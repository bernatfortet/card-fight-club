class App extends Spine.Controller
	userInfo: null


	constructor: ->
		super

	initialize: ->
		this.gameController = new GameController()
		this.dbController = new DBController()
		this.networkController = new NetworkController()

		this.dbController.getDeckFromMongoLab( this.getDeckid() )

	createUser: ( userData, deckData  ) ->
		randomId = Math.floor( Math.random() * 1000 )
		User.create({ id: randomId,  name: "pepito", deck: deckData })
		this.networkController.onReady()

	startGame: ->
		this.gameController.initialize()

	getDeckid: ->
		deckId = prompt("Insert Deck Id","");

		if( deckId == "1")
			deckId = "50df4fe8e4b0d84e5fee60ad" #RedRage
		else if( deckId == "2" )
			deckId = "50dcf268e4b0b7b39972bf5f" #FirstDeck
		else if( deckId == "3" )
			deckId = "50df5072e4b0d84e5fee60b0" #Fragmentados
		else 
			deckId = "50df4fe8e4b0d84e5fee60ad" #RedRage
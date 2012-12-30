class GameController extends Spine.Controller

	areas:
		deck: "deck"
		hand: "hand"
		board: "board"
		graveyard: "graveyard"


	constructor: ->
		super


	initialize: ->
		this.humanInputController = new HumanInputController()
		this.networkInputController = new NetworkInputController()

		this.multiplayerController = new MultiplayerController( )

		this.zoomedCardController = new ZoomedCardController( el: $(".ZoomedCard") )
		this.cardListerController = new CardListerController( el: $(".CardLister") )

		this.player = new PlayerController( el: $(".Player"), multiplayerController: this.multiplayerController, cardListerController: this.cardListerController )
		this.opponent = new PlayerController( el: $(".opponent") )

		this.humanInputController.setTargetPlayer( this.player )
		this.networkInputController.setTargetPlayer( this.opponent )

		this.player.setDeck( User.first().deck )

		this.humanInputController.setListeners()
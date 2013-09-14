class @GameController extends Spine.Controller

	areas:
		deck: "deck"
		hand: "hand"
		board: "board"
		graveyard: "graveyard"

	constructor: ->
		super

	initialize: ->
		this.multiplayerController = new MultiplayerController()
		this.humanInputController = new HumanInputController()
		this.networkInputController = new NetworkInputController()
		this.chatController = new ChatController( el: $(".Chat") )
		this.soundController = new SoundController( el: $(".Sounds") )
		
		this.zoomedCardController = new ZoomedCardController( el: $(".ZoomedCard") )
		this.cardListerController = new CardListerController( el: $(".CardLister") )

		this.player = new PlayerController( el: $(".HumanPlayer"), multiplayerController: this.multiplayerController, cardListerController: this.cardListerController )
		this.opponent = new PlayerController( el: $(".Opponent") )

		this.humanInputController.setTargetPlayer( this.player )
		this.networkInputController.setTargetPlayer( this.opponent )


		this.humanInputController.setListeners()
		this.humanInputController.onResize()
		this.showGameBoard()

		#this.player.setDeck( User.first().deck )
		selectedDeckId = '1'
		this.player.setDeck( Meteor.decks.findOne( selectedDeckId ) )
		this.player.createLifeCounter()

	reset: ->
		for card in Card.all()
			cardArea = Area.find( card.areaId )
			cardOwner = cardArea.controller.player
			ownerIsPlayer = cardOwner.el == this.player.el

			if( card.controller && ownerIsPlayer )
				cardOwner.changeCardArea( card, cardOwner.deckArea.id )

	showGameBoard: ->
		$("#Game").addClass("active") #Use Spine sections
		$(".Loading").remove() #Use Spine sections
		
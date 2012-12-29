class PlayerController extends Spine.Controller
	deck: null
	multiplayerController: null

	constructor: () ->
		super

		this.deckController = new DeckController( el: this.el.find(".Deck"), player: this )
		this.handController = new BoardController( el: this.el.find(".Hand"), player: this )
		this.boardController = new BoardController( el: this.el.find(".Board"), player: this )
		this.graveyardController = new BoardController( el: this.el.find(".Graveyard"), player: this )
		this.sideboardController = new BoardController( el: this.el.find(".Sideboard"), player: this )

		this.deckArea	= Area.create( name: "deck", controller: this.deckController )
		this.hand 		= Area.create( name: "hand", controller: this.handController )
		this.board 		= Area.create( name: "board", controller: this.boardController )
		this.graveyard 	= Area.create( name: "graveyard", controller: this.graveyardController )
		this.sideboard 	= Area.create( name: "sideboard", controller: this.sideboardController )

		this.deckArea.setList()
		this.hand.setList()
		this.board.setList()
		this.graveyard.setList()
		this.sideboard.setList()

		this.deckController.setItem( this.deckArea )
		this.handController.setItem( this.hand )
		this.boardController.setItem( this.board )
		this.graveyardController.setItem( this.graveyard )
		this.sideboardController.setItem( this.sideboard )

	setDeck: ( deck ) ->
		this.deck = Deck.create( 
			name: deck.name, 
			cards: deck.cards
			controller: this.deckController
		)

		this.deckController.deck = this.deck
		
		this.multiplayerController.onCreateDeck( this.deck ) if this.multiplayerController?

		this.shuffleArea( this.deckArea.id )


	createCardFromTopOfDeck: () ->
		topCard = this.deckArea.getTopCard()
		if( topCard )
			this.addCard( topCard )

	addCard: ( cardModel ) ->
		cardController = new CardController( item: cardModel )
		cardModel.setController( cardController )

		if ( this.isPlayerNetworked() )
			this.multiplayerController.onCreateCard( cardModel )
			this.setCardListeners( cardController.el )
		else
			this.setCardHoverListener( cardController.el )

		this.renderCard( cardController.el )
		this.moveToAreaLocation( cardModel, this.hand.id )
		
		this.onCardChangesArea( cardModel, this.hand.id )
		#this.flipCardUp( cardModel )

	renderCard: ( cardEl ) ->
		this.el.find(".Cards").append( cardEl )

	setCardListeners: ( cardEl ) ->
		app.gameController.humanInputController.setCardListeners( cardEl )

	setCardHoverListener: ( cardEl ) ->
		app.gameController.humanInputController.setCardHoverListener( cardEl )

	moveToAreaLocation: ( cardModel, areaId ) ->
		areaModel = Area.find( areaId )
		areaPosX = areaModel.controller.el.offset().left / $(window).width()
		areaPosY = areaModel.controller.el.offset().top / $(window).height()
		cardModel.controller.move( areaPosX, areaPosY )

	moveCard: ( cardModel, location ) ->
		cardModel.controller.move( location.x, location.y )
		this.multiplayerController.onMoveCard( cardModel ) if this.isPlayerNetworked()

	tapCard: ( cardModel ) ->
		cardModel.controller.tap()
		this.multiplayerController.onTapCard( cardModel ) if this.isPlayerNetworked()

	flipCard: ( cardModel ) ->
		if( cardModel.controller.isFlippedUp  )
			this.flipCardDown()
		else
			this.flipCardUp()

	flipCardUp: ( cardModel ) ->
		cardModel.controller.flipUp()
		this.multiplayerController.onFlipCardUp( cardModel ) if this.isPlayerNetworked()

	flipCardDown: ( cardModel ) ->
		cardModel.controller.flipDown()
		this.multiplayerController.onFlipCardDown( cardModel ) if this.isPlayerNetworked()

	onCardChangesArea: ( cardModel, areaId ) ->
		areaModel = Area.find( areaId )
		if( !this.checkIfCardComesFromSameArea( cardModel.areaId, areaModel.id ) )
			this.multiplayerController.onCardChangesArea( cardModel, areaModel ) if this.isPlayerNetworked()
			areaModel.controller.onCardDrops( cardModel )
			cardModel.setArea( areaId )
			#Put moveCard here again with else if cards dont move when created

	checkIfCardComesFromSameArea: ( originArea, targetArea ) ->
		if( originArea == targetArea )
			return true
		else
			return false

	shuffleArea: ( areaId ) ->
		areaModel = Area.find( areaId )
		areaModel.shuffle()
		this.multiplayerController.onShuffle( areaModel ) if this.isPlayerNetworked()

	onDrawCard: () ->
		this.createCardFromTopOfDeck()

	showCardsFromArea: ( areaId ) ->
		this.cardListerController.showCardsFromArea( Area.find( areaId ) )

	isPlayerNetworked: ->
		return this.multiplayerController?

	# getCardPercentPosX: ( cardModel ) ->
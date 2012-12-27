class PlayerController extends Spine.Controller
	deck: null

	constructor: () ->
		super

	setDeck: ( deck ) ->

		deckController = new DeckController( el: this.el.find(".Deck"), player: this )
		handController = new BoardController( el: this.el.find(".Hand"), player: this )
		boardController = new BoardController( el: this.el.find(".Board"), player: this )
		graveyardController = new BoardController( el: this.el.find(".Graveyard"), player: this )
		sideboardController = new BoardController( el: this.el.find(".Sideboard"), player: this )

		this.deckArea	= Area.create( name: "deck", controller: deckController )
		this.hand 		= Area.create( name: "hand", controller: handController )
		this.board 		= Area.create( name: "board", controller: boardController )
		this.graveyard 	= Area.create( name: "graveyard", controller: graveyardController )
		this.sideboard 	= Area.create( name: "sideboard", controller: sideboardController )

		this.deckArea.setList()
		this.hand.setList()
		this.board.setList()
		this.graveyard.setList()
		this.sideboard.setList()

		deckController.setItem( this.deckArea )
		handController.setItem( this.hand )
		boardController.setItem( this.board )
		graveyardController.setItem( this.graveyard )
		sideboardController.setItem( this.sideboard )

		this.deck = Deck.create( 
			name: deck.name, 
			baseCards: deck.cardList
			controller: deckController
		)

		deckController.deck = this.deck

		this.shuffleDeck()

	createCardFromTopOfDeck: () ->
		topCard = this.deckArea.getTopCard()
		if( topCard )
			this.addCard( topCard )

	addCard: ( card ) ->
		cardController = new CardController( item: card )
		card.setController( cardController )
		this.el.find(".Cards").append( cardController.el )
		app.gameController.humanInputController.setCardListeners( cardController.el )
		cardController.moveToArea( this.hand.id )
		this.flipCardUp( card )
		app.gameController.multiplayerController.onCreateCard( card )

	moveCard: ( card, posX, posY ) ->
		card.controller.move( posX, posY )

	tapCard: ( card ) ->
		card.controller.tap()

	flipCard: ( card ) ->
		card.controller.flip()

	flipCardUp: ( card ) ->
		card.controller.flipUp()

	flipCardDown: ( card ) ->
		card.controller.flipDown()

	onCardGoesToArea: ( card, areaId ) ->
		areaModel = Area.find( areaId )
		if( !this.checkIfCardComesFromSameArea( card.areaId, areaModel.id ) )
			app.gameController.multiplayerController.onMoveCard( card )
			app.gameController.multiplayerController.onCardChangesArea( areaModel )
			areaModel.controller.onCardDrops( card )
			card.setArea( areaId )

		else
			app.gameController.multiplayerController.onMoveCard( card )

	checkIfCardComesFromSameArea: ( originArea, targetArea ) ->
		if( originArea == targetArea )
			return true
		else
			return false

	shuffleDeck: () ->
		this.deckArea.shuffle()
		app.gameController.multiplayerController.onShuffle( this.deckArea )

	onDrawCard: () ->
		this.createCardFromTopOfDeck()

	showDeckCards: () ->
		app.gameController.cardListerController.show( this.deck.cardsOnDeck.list )

	# getCardPercentPosX: ( card ) ->
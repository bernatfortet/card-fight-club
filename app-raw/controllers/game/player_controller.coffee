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
			baseCards: deck.cards
			controller: deckController
		)

		deckController.deck = this.deck

		this.shuffleArea( this.deckArea.id )

	createCardFromTopOfDeck: () ->
		topCard = this.deckArea.getTopCard()
		if( topCard )
			this.addCard( topCard )

	addCard: ( cardModel ) ->
		cardController = new CardController( item: cardModel )
		cardModel.setController( cardController )
		app.gameController.multiplayerController.onCreateCard( cardModel )

		this.renderCard( cardController.el )
		this.setCardListeners( cardController.el )
		this.moveToAreaLocation( cardModel, this.hand.id )
		
		this.onCardGoesToArea( cardModel, this.hand.id )
		this.flipCardUp( cardModel )

	renderCard: ( cardEl ) ->
		this.el.find(".Cards").append( cardEl )

	setCardListeners: ( cardEl ) ->
		app.gameController.humanInputController.setCardListeners( cardEl )

	moveToAreaLocation: ( cardModel, areaId ) ->
		areaModel = Area.find( areaId )
		areaPosX = areaModel.controller.el.offset().left / $(window).width()
		areaPosY = areaModel.controller.el.offset().top / $(window).height()
		cardModel.controller.move( areaPosX, areaPosY )

	moveCard: ( cardModel, location ) ->
		cardModel.controller.move( location.left / $(window).width(), location.top / $(window).height() )

	tapCard: ( cardModel ) ->
		cardModel.controller.tap()

	flipCard: ( cardModel ) ->
		cardModel.controller.flip()

	flipCardUp: ( cardModel ) ->
		cardModel.controller.flipUp()

	flipCardDown: ( cardModel ) ->
		cardModel.controller.flipDown()

	onCardGoesToArea: ( cardModel, areaId ) ->
		areaModel = Area.find( areaId )
		if( !this.checkIfCardComesFromSameArea( cardModel.areaId, areaModel.id ) )
			app.gameController.multiplayerController.onMoveCard( cardModel )
			app.gameController.multiplayerController.onCardChangesArea( areaModel )
			areaModel.controller.onCardDrops( cardModel )
			cardModel.setArea( areaId )

		else
			app.gameController.multiplayerController.onMoveCard( cardModel )

	checkIfCardComesFromSameArea: ( originArea, targetArea ) ->
		if( originArea == targetArea )
			return true
		else
			return false

	shuffleArea: ( areaId ) ->
		areaModel = Area.find( areaId )
		areaModel.shuffle()
		app.gameController.multiplayerController.onShuffle( areaModel )

	onDrawCard: () ->
		this.createCardFromTopOfDeck()

	showCardsFromArea: ( areaId ) ->
		app.gameController.cardListerController.showCardsFromArea( Area.find( areaId ) )

	# getCardPercentPosX: ( cardModel ) ->
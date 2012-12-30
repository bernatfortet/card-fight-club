class PlayerController extends Spine.Controller
	 
	deck: null
	multiplayerController: null
	cardListerController: null

	constructor: () ->
		super

		this.deckController = new DeckController( el: this.el.find(".Deck"), player: this )
		this.handController = new HandController( el: this.el.find(".Hand"), player: this )
		this.boardController = new BoardController( el: this.el.find(".Board"), player: this )
		this.graveyardController = new GraveyardController( el: this.el.find(".Graveyard"), player: this )
		this.sideboardController = new SideboardController( el: this.el.find(".Sideboard"), player: this )

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


	onDrawCard: () ->
		this.createCardFromTopOfDeck()
		this.deckController.onDrawCard()

	createCardFromTopOfDeck: () ->
		topCard = this.deckArea.getAndRemoveTopCard()
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
		
		this.changeCardArea( cardModel, this.hand.id )
		this.flipCardUp( cardModel )

	removeCard: ( cardModel ) ->
		cardModel.controller.el.remove()
		cardModel.controller = null
		this.multiplayerController.onRemoveCard( cardModel ) if this.isPlayerNetworked()

	renderCard: ( cardEl ) ->
		this.el.find(".Cards").append( cardEl )

	moveToAreaLocation: ( cardModel, areaId ) ->
		#TODO Rethink this methods
		areaModel = Area.find( areaId )
		if( areaModel.name == "hand" )
			areaPosX = this.getCardPositionInHand( areaModel )
		else
			areaPosX = areaModel.controller.el.offset().left / $(window).width()

		areaPosY = areaModel.controller.el.offset().top / $(window).height()
		cardModel.controller.move( areaPosX, areaPosY )

	getCardPositionInHand: ( areaModel ) ->
		
		cardWidth = 120 #TODO Unharcode this number
		cardsInHand = areaModel.cards.Count()
		return ( areaModel.controller.el.offset().left + ( cardsInHand * cardWidth ) ) / $(window).width()



	moveCard: ( cardModel, location ) ->
		cardModel.controller.move( location.x, location.y )
		this.multiplayerController.onMoveCard( cardModel ) if this.isPlayerNetworked()

	changeCardArea: ( cardModel, areaId ) ->
		areaModel = Area.find( areaId )
		if( !this.checkIfCardComesFromSameArea( cardModel.areaId, areaModel.id ) )
			this.multiplayerController.onCardChangesArea( cardModel, areaModel ) if this.isPlayerNetworked()
			cardModel.setArea( areaId )
			areaModel.controller.onCardDrops( cardModel )

	checkIfCardComesFromSameArea: ( originArea, targetArea ) ->
		if( originArea == targetArea )
			return true
		else
			return false
			
	tapCard: ( cardModel ) ->
		cardModel.controller.tap()
		this.multiplayerController.onTapCard( cardModel ) if this.isPlayerNetworked()

	flipCardUp: ( cardModel ) ->
		cardAreaModel = Area.find( cardModel.areaId )
		return if( !this.isPlayerNetworked() && cardAreaModel.name == "hand" )
		cardModel.controller.flipUp()
		this.multiplayerController.onFlipCardUp( cardModel ) if this.isPlayerNetworked()

	flipCardDown: ( cardModel ) ->
		cardModel.controller.flipDown()
		this.multiplayerController.onFlipCardDown( cardModel ) if this.isPlayerNetworked()

	zoomCardIn: ( cardModel ) ->
		app.gameController.zoomedCardController.zoomIn( cardModel )

	zoomCardOut: () ->
		app.gameController.zoomedCardController.zoomOut()

	shuffleArea: ( areaId ) ->
		areaModel = Area.find( areaId )
		areaModel.shuffle()
		this.multiplayerController.onShuffle( areaModel ) if this.isPlayerNetworked()

	toogleRevealTopCardFromArea: ( areaModel ) ->
		cardModel = areaModel.getTopCard()
		this.toggleRevealCardFromArea( cardModel, areaModel )

	toggleRevealCardFromArea: ( cardModel, areaModel ) ->
		areaModel.controller.toggleRevealTopCard( cardModel )
		this.multiplayerController.onToggleRevealCardFromArea( cardModel, areaModel ) if this.isPlayerNetworked()

	showCardsFromArea: ( areaId ) ->
		this.cardListerController.showCardsFromArea( Area.find( areaId ) )

	setCardListeners: ( cardEl ) ->
		app.gameController.humanInputController.setCardListeners( cardEl )

	setCardHoverListener: ( cardEl ) ->
		app.gameController.humanInputController.setCardHoverListener( cardEl )

	isPlayerNetworked: ->
		return this.multiplayerController?
	# getCardPercentPosX: ( cardModel ) ->
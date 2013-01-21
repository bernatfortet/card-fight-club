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


	onDrawCardFromArea: ( areaModel ) ->
		this.createCardFromTopOfArea( areaModel )
		areaModel.controller.onDrawCard()

	createCardFromTopOfArea: ( areaModel ) ->
		topCard = areaModel.getAndRemoveTopCard()
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
		
		this.changeCardArea( cardModel, this.hand.id )
		this.moveToAreaLocation( cardModel, this.hand.id )
		
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
		cardWidth = 100 #TODO Unharcode this number
		cardsInHand = areaModel.cards.Count()
		areaLeftOffset = areaModel.controller.el.offset().left
		areaOuterWidth = areaModel.controller.el.outerWidth()
		cardPosition = areaLeftOffset + ( cardsInHand * cardWidth )
		if( cardPosition <= areaOuterWidth ) 
			return cardPosition /  $(window).width()
		else 
			return ( areaOuterWidth - cardWidth ) /  $(window).width()

	moveCard: ( cardModel, location ) ->
		cardModel.controller.move( location.x, location.y )
		this.multiplayerController.onMoveCard( cardModel ) if this.isPlayerNetworked()

	changeCardArea: ( cardModel, areaId ) ->
		areaModel = Area.find( areaId )
		if( !this.checkIfCardComesFromSameArea( cardModel.areaId, areaId ) )
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

	untapCard: ( cardModel ) ->
		cardModel.controller.untap()
		this.multiplayerController.onUntapCard( cardModel ) if this.isPlayerNetworked()

	flipCardUp: ( cardModel ) ->
		cardAreaModel = Area.find( cardModel.areaId )
		return if( !this.isPlayerNetworked() && cardAreaModel.name == "hand" )
		cardModel.controller.flipUp()
		this.multiplayerController.onFlipCardUp( cardModel ) if this.isPlayerNetworked()
		app.gameController.soundController.playSound("flipCard")

	flipCardDown: ( cardModel ) ->
		cardModel.controller.flipDown()
		this.multiplayerController.onFlipCardDown( cardModel ) if this.isPlayerNetworked()
		app.gameController.soundController.playSound("flipCard")

	zoomCardIn: ( cardModel ) ->
		app.gameController.zoomedCardController.zoomIn( cardModel )

	zoomCardOut: () ->
		app.gameController.zoomedCardController.zoomOut()

	# Area
	shuffleArea: ( areaId ) ->
		areaModel = Area.find( areaId )
		areaModel.shuffle()
		this.multiplayerController.onShuffle( areaModel ) if this.isPlayerNetworked()
		app.gameController.soundController.playSound("shuffleDeck")

	toogleRevealTopCardFromArea: ( areaModel ) ->
		cardModel = areaModel.getTopCard()
		this.toggleRevealCardFromArea( cardModel, areaModel )

	toggleRevealCardFromArea: ( cardModel, areaModel ) ->
		areaModel.controller.toggleRevealTopCard( cardModel )
		this.multiplayerController.onToggleRevealCardFromArea( cardModel, areaModel ) if this.isPlayerNetworked()

	showCardsFromArea: ( areaId ) ->
		this.cardListerController.showCardsFromArea( Area.find( areaId ) )



	passTurn: ->
		$(".Player").attr("state", "")
		$(".Opponent").attr("state", "Active")

		app.gameController.soundController.playSound("receiveTurn") #Play sound on passTurn
		this.multiplayerController.onPassTurn() if this.isPlayerNetworked()

	receiveTurn: ->
		$(".Player").attr("state", "")
		this.el.attr("state", "Active")
		app.gameController.soundController.playSound("receiveTurn")

	throwDice: ->
		diceResult = this.getRandomInt( 1, 6 )

		params = 
			userName: User.first().name
			diceResult: diceResult

		app.gameController.chatController.renderThrowDice( params )
		app.gameController.soundController.playSound("throwDice")

		this.multiplayerController.onThrowDice( diceResult ) if this.isPlayerNetworked()


	# Counters
	addCounter: ( counterModel ) ->
		counterController = new CounterController( item: counterModel )
		counterModel.setController( counterController )

		if ( this.isPlayerNetworked() ) #TODO should all players be able to set and move counters? 
			this.multiplayerController.onCreateCounter( counterModel )
			this.setCounterListeners( counterController.el )

		this.renderCounter( counterController.el )

	renderCounter: ( counterEl ) ->
		this.el.find(".Counters").append( counterEl )

	removeCounter: ( counterModel ) ->
		counterModel.controller.el.remove()
		counterModel.controller = null
		this.multiplayerController.onRemoveCounter( counterModel ) if this.isPlayerNetworked()

	moveCounter: ( counterModel, location ) ->
		counterModel.controller.move( location.x, location.y )
		this.multiplayerController.onMoveCounter( counterModel ) if this.isPlayerNetworked()

	attachCounterToCard: ( counterModel, cardModel ) =>
		counterModel.controller.attachToCard( cardModel.controller )
		cardModel.controller.attachCounter( counterModel.controller )
		this.multiplayerController.onAttachCounterToCard( counterModel, cardModel ) if this.isPlayerNetworked()

	unattachCounter: ( counterModel ) =>
		if( counterModel.controller.isAttached )
			cardController = counterModel.controller.cardControllerAttachedTo
			cardController.unattachCounter( counterModel.controller )

			counterModel.controller.unattach()
			this.multiplayerController.onUnattachCounter( counterModel ) if this.isPlayerNetworked()

	# Utils
	setCardListeners: ( cardElement ) ->
		app.gameController.humanInputController.setCardListeners( cardElement )

	setCounterListeners: ( counterElement ) ->
		app.gameController.humanInputController.setCounterListener( counterElement )

	setCardHoverListener: ( cardEl ) ->
		app.gameController.humanInputController.setCardHoverListener( cardEl )

	getRandomInt: ( min, max ) ->
		Math.floor(Math.random() * (max - min + 1)) + min;

	isPlayerNetworked: ->
			return this.multiplayerController?

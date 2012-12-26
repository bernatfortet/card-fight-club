class PlayerController extends Spine.Controller
	deck: null

	constructor: () ->
		super

	setDeck: ( deck ) ->
		this.deck = Deck.create( 
			name: deck.name, 
			baseCards: deck.cardList
		)

	createCardFromTopOfDeck: () ->
		topCard = this.deck.getTopCard()
		if( topCard )
			this.addCard( topCard )

	addCard: ( card ) ->
		cardController = new CardController( item: card )
		this.el.find(".Cards").append( cardController.el )
		app.gameController.humanInputController.setCardListeners( cardController.el )
		cardController.moveToHand()
		this.flipCardUp( card )

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

	onCardGoesToHand: ( card ) ->
		if( this.checkIfCardComesFromSameArea( card.area, "hand" ) )
			card.setArea( "hand" )

	onCardGoesToDeck: ( card ) ->
		if( this.checkIfCardComesFromSameArea( card.area, "deck" ) )
			this.deck.putCardOnTop( card )
			card.setArea( "deck" )

	onCardGoesToBoard: ( card ) ->
		if( this.checkIfCardComesFromSameArea( card.area, "board" ) )
			card.setArea( "board" )

	onCardGoesToGraveyard: ( card ) ->
		if( this.checkIfCardComesFromSameArea( card.area, "graveyard" ) )
			card.setArea( "graveyard" )

	checkIfCardComesFromSameArea: ( originArea, targetArea ) ->
		if( originArea != targetArea )
			return true
		else
			return false

	onDrawCard: () ->
		this.createCardFromTopOfDeck()

	# getCardPercentPosX: ( card ) ->
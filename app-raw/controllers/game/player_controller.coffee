class PlayerController extends Spine.Controller
	deck: null

	constructor: ( deck ) ->
		super

	setDeck: () ->
		this.addCard( card ) for card in [this.deck.cards.Count()-1..0]

	drawCard: () ->
		console.log("draw Card");

	addCard: ( cardNumber ) ->
		cardModel = Card.create( img_id: this.deck.cards.Get(cardNumber), deck_id: 1, area: "deck", controller: null  )
		cardController = new CardController( item: cardModel )
		this.el.find(".Cards").append( cardController.el )
		cardController.moveToDeck()

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
		if( card.area != "hand" )
			this.onCardChangesArea( card, "hand" )

	onCardGoesToDeck: ( card ) ->
		if( card.area != "deck" )
			this.onCardChangesArea( card, "deck" )

	onCardGoesToBoard: ( card ) ->
		if( card.area != "board" )
			this.onCardChangesArea( card, "board" )

	onCardGoesToGraveyard: ( card ) ->
		if( card.area != "graveyard" )
			this.onCardChangesArea( card, "graveyard" )

	onCardChangesArea: ( card, area ) ->
		if( card.area != area )

			if( card.area == "deck" && ( area == "hand" || area == "graveyard" || area == "board" ) )
				this.deck.getTopCard()

			if( area == "deck" )
				this.deck.putCardOnTop( card )

			card.setArea( area )

	# getCardPercentPosX: ( card ) ->
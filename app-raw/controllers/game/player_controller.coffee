class PlayerController extends Spine.Controller
	constructor: ( deck ) ->
		super

	setDeck: () ->
		console.log("setting Deck");
		this.addCard( card ) for card in this.deck.cards.queue()

	drawCard: () ->
		console.log("draw Card");

	addCard: ( cardId ) ->
		cardModel = Card.create( img_id: cardId, deck_id: 1, area: null, controller: null  )
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

	getCardPercentPosX: ( card ) ->

		

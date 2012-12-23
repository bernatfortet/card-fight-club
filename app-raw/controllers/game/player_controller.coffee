class PlayerController extends Spine.Controller
	constructor: ( deck ) ->
		super

	setDeck: () ->
		console.log("setting Deck");
		this.addCard() for card in this.deck.baseCards

	drawCard: () ->
		console.log("draw Card");

	addCard: ->
		card_item = this.deck.getTopCard()
		cardModel = Card.create( id: card_item, img_id: card_item, deck_id: 1, area: null, controller: null  )
		cardController = new CardController( item: cardModel )
		this.el.find(".Cards").append( cardController.el )

	moveCard: ( card, posX, posY ) ->
		card.controller.move( posX, posY )

	tapCard: ( card ) ->
		card.controller.tap()

	flipCard: ( card ) ->
		card.controller.flip()

	getCardPercentPosX: ( card ) ->

		

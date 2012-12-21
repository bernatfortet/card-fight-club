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
		cardModel = Card.create( id: card_item, img_id: card_item, deck_id: 1  )
		cardController = new CardController( item: cardModel )
		this.el.find(".Cards").append( cardController.el );

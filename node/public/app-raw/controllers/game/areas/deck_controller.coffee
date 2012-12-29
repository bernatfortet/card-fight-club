class DeckController extends AreaController
	deck: null 

	constructor: ->
		super

	addCard: ( card, targetArea ) ->
		this.item.addCard( card, targetArea )
		if( card.controller != null)
			card.controller.el.remove()
			card.controller = null
		this.checkCardsEmpty()

	removeCard: ( card ) ->
		this.item.removeCard( card )
		this.checkCardsEmpty()

	onCardDrops: ( card ) ->
		this.player.flipCardDown( card )
		#Remove Card Element
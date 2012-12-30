class DeckController extends AreaController
	deck: null 

	constructor: ->
		super

	addCard: ( cardModel, targetArea ) ->
		this.item.addCard( cardModel, targetArea )
		this.checkCardsEmpty()

	removeCard: ( cardModel ) ->
		this.item.removeCard( cardModel )
		this.checkCardsEmpty()

	onCardDrops: ( cardModel ) ->
		this.player.flipCardDown( cardModel )
		this.player.removeCard( cardModel )
		#Remove Card Element

	onDrawCard: () ->
		if( this.isTopCardRevealed )
			this.player.toogleRevealTopCardFromArea( this.item )
class GraveyardController extends AreaController
	constructor: ->
		super
		
	onCardDrops: ( cardModel ) ->
		this.player.removeCard( cardModel )
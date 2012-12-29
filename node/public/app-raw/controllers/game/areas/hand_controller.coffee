class HandController extends AreaController
	constructor: ->
		super

	onCardDrops: ( card ) ->
		this.player.flipCardUp( card )
		this.onZoomCardIn( card.id )
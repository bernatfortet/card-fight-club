class HandController extends AreaController
	constructor: ->
		super

	onCardDrops: ( card ) ->
		this.player.flipCardUp( card )
		this.player.zoomCardIn( card )
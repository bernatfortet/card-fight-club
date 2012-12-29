class BoardController extends AreaController
	constructor: ->
		super

	onCardDrops: ( card ) ->
		this.player.flipCardDown( card )
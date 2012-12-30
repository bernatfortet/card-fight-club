class HandController extends AreaController
	constructor: ->
		super

	onCardDrops: ( card ) ->
		if( !this.player.isPlayerNetworked() )
			this.player.flipCardDown( card )
		else
			this.player.flipCardUp( card )
			this.player.zoomCardIn( card )
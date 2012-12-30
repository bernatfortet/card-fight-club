class BoardController extends AreaController
	constructor: ->
		super

	onCardDrops: ( card ) ->
		if( !card.controller.isFlippedUp && !this.player.isPlayerNetworked() )
			this.player.flipCardUp( card )
		else if( card.controller.isFlippedUp )
			this.player.flipCardUp( card )
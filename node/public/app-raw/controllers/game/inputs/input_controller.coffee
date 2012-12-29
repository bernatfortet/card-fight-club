class InputController extends Spine.Controller

	targetPlayer: null

	constructor: ->
		super
				
	setTargetPlayer: ( targetPlayer ) ->
		this.targetPlayer = targetPlayer

	onCreateCard: ( card ) =>
		this.targetPlayer.addCard( card );
		
	onMoveCard: ( cardId, location ) ->
		this.targetPlayer.moveCard( Card.find( cardId ), location )

	onTapCard: ( cardId ) ->
		this.targetPlayer.tapCard( Card.find( cardId ) )

	onFlipCard: ( cardId ) ->
		this.targetPlayer.flipCard( Card.find( cardId ) )

	onFlipCardUp: ( cardId ) ->
		this.targetPlayer.flipCardUp( Card.find( cardId ) )

	onFlipCardDown: ( cardId ) ->
		this.targetPlayer.flipCardDown( Card.find( cardId ) )

	onCardChangesArea: ( cardId, areaId ) =>
		this.targetPlayer.onCardChangesArea( Card.find( cardId ), areaId )

	onZoomCardIn: ( cardId ) =>
		app.gameController.zoomedCardController.zoomIn( Card.find( cardId ) )

	onZoomCardOut: () =>
		app.gameController.zoomedCardController.zoomOut()

	onShuffleArea: ( key, opt ) =>
		areaId = opt.$trigger.data().areaId
		this.targetPlayer.shuffleArea( areaId )

	onViewCardsFromArea: ( key, opt ) =>
		areaId = opt.$trigger.data().areaId
		this.targetPlayer.showCardsFromArea( areaId )
	
	onDrawCard: () =>
		this.targetPlayer.onDrawCard();
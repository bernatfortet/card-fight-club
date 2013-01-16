class InputController extends Spine.Controller

	targetPlayer: null

	constructor: ->
		super
	
	setTargetPlayer: ( targetPlayer ) ->
		this.targetPlayer = targetPlayer

	onCreateDeck: ( deckData ) =>
		this.targetPlayer.setDeck( deckData );

	onCreateCard: ( cardModel ) =>
		this.targetPlayer.addCard( cardModel );

	onRemoveCard: ( cardId ) ->
		this.targetPlayer.removeCard( Card.find( cardId ) )
		
	onMoveCard: ( cardId, location ) ->
		this.targetPlayer.moveCard( Card.find( cardId ), location )

	onTapCard: ( cardId ) ->
		this.targetPlayer.tapCard( Card.find( cardId ) )

	onUntapCard: ( cardId ) ->
		this.targetPlayer.untapCard( Card.find( cardId ) )

	onFlipCard: ( cardId ) ->
		this.targetPlayer.flipCard( Card.find( cardId ) )

	onFlipCardUp: ( cardId ) ->
		this.targetPlayer.flipCardUp( Card.find( cardId ) )

	onFlipCardDown: ( cardId ) ->
		this.targetPlayer.flipCardDown( Card.find( cardId ) )

	onChangeCardArea: ( cardId, areaId ) =>
		this.targetPlayer.changeCardArea( Card.find( cardId ), areaId )

	onZoomCardIn: ( cardId ) =>
		this.targetPlayer.zoomCardIn(Card.find( cardId ) )

	onZoomCardOut: () =>
		this.targetPlayer.zoomCardOut()

	onShuffleArea: ( key, opt ) =>
		areaId = opt.$trigger.data().areaId
		this.targetPlayer.shuffleArea( areaId )

	onToggleRevealTopCardFromArea: ( areaId ) =>
		this.targetPlayer.toogleRevealTopCardFromArea( Area.find( areaId ) )

	onToggleRevealCardFromArea: ( cardId, areaId ) =>
		this.targetPlayer.toggleRevealCardFromArea( Card.find( cardId ), Area.find( areaId ) )

	onViewCardsFromArea: ( key, opt ) =>
		areaId = opt.$trigger.data().areaId
		this.targetPlayer.showCardsFromArea( areaId )
	
	onDrawCardFromArea: ( areaId ) =>
		this.targetPlayer.onDrawCardFromArea( Area.find( areaId ) );

	onPassTurn: () =>
		this.targetPlayer.passTurn();

	onReceiveTurn: () =>
		this.targetPlayer.receiveTurn();
		
		

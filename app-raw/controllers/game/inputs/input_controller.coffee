class InputController extends Spine.Controller

	targetPlayer: null

	constructor: ->
		super
				
	setTargetPlayer: ( targetPlayer ) ->
		this.targetPlayer = targetPlayer

	onMoveCard: ( cardId, position ) ->
		this.targetPlayer.moveCard( Card.find( cardId ), position )
		#console.log("onCardIsMoved ", Card.find( cardId ), position);

	onCardIsTapped: ( cardId ) ->
		this.targetPlayer.tapCard( Card.find( cardId ) )
		#console.log("onCardIsTapped ", Card.find( cardId ) );

	onCardIsFlipped: ( cardId ) ->
		this.targetPlayer.flipCard( Card.find( cardId ) )
		#console.log( "onCardIsFlipped ", Card.find( cardId ) );

	onCardGoesToArea: ( cardId, areaId ) =>
		this.targetPlayer.onCardGoesToArea( Card.find( cardId ), areaId )
		#console.log( "onCardGoesToArea ", Card.find( cardId ), "AreaId: " + areaId );

	onZoomCardIn: ( cardId ) =>
		app.gameController.zoomedCardController.zoomIn( Card.find( cardId ) )
		#console.log( "onZoomCard", Deck.find( deckId ) );

	onZoomCardOut: () =>
		app.gameController.zoomedCardController.zoomOut()
		#console.log( "onZoomCard", Deck.find( deckId ) );

	onShuffleArea: ( key, opt ) =>
		areaId = opt.$trigger.data().areaId
		this.targetPlayer.shuffleArea( areaId )
		#console.log( "onShuffleDeck", Deck.find( deckId ) );

	onViewCardsFromArea: ( key, opt ) =>
		areaId = opt.$trigger.data().areaId
		this.targetPlayer.showCardsFromArea( areaId )
	
	onDrawCard: () =>
		this.targetPlayer.onDrawCard();
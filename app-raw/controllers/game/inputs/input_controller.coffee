class InputController extends Spine.Controller

	targetPlayer: null

	constructor: ->
		super
				
	setTargetPlayer: ( targetPlayer ) ->
		this.targetPlayer = targetPlayer

	onCardIsMoved: ( cardId, position ) ->
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

	onShuffleDeck: () =>
		this.targetPlayer.deck.shuffle()
		#console.log( "onShuffleDeck", Deck.find( deckId ) );

	onViewDeckCards: () =>
		app.gameController.cardListerController.showDeckCards( this.targetPlayer.deck.id )
	
	onDrawCard: () =>
		this.targetPlayer.onDrawCard();
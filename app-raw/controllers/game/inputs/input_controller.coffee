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

	onCardGoesToHand: ( cardId ) =>
		this.targetPlayer.flipCardUp( Card.find( cardId ) )
		this.onZoomCardIn( cardId )
		#console.log( "onDropCardOnHand", Card.find( cardId ) );

	onCardGoesToDeck: ( cardId ) =>
		this.targetPlayer.flipCardDown( Card.find( cardId ) )
		#console.log( "onDropCardOnDeck", Card.find( cardId ) );

	onZoomCardIn: ( cardId ) =>
		app.gameController.zoomedCardController.zoomIn( Card.find( cardId ) )
		#console.log( "onZoomCard", Deck.find( deckId ) );

	onZoomCardOut: () =>
		app.gameController.zoomedCardController.zoomOut()
		#console.log( "onZoomCard", Deck.find( deckId ) );

	onShuffleDeck: ( deckId ) =>
		#console.log( "onShuffleDeck", Deck.find( deckId ) );

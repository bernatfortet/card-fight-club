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
		this.targetPlayer.onCardGoesToHand( Card.find( cardId ) )
		#console.log( "onDropCardOnHand", Card.find( cardId ) );

	onCardGoesToDeck: ( cardId ) =>
		this.targetPlayer.flipCardDown( Card.find( cardId ) )
		this.targetPlayer.onCardGoesToDeck( Card.find( cardId ) )
		#console.log( "onCardGoesToDeck", Card.find( cardId ) );

	onCardGoesToBoard: ( cardId ) =>
		this.targetPlayer.onCardGoesToBoard( Card.find( cardId ) )
		#console.log( "onCardGoesToBoard", Card.find( cardId ) );

	onCardGoesToGraveyard: ( cardId ) =>
		this.targetPlayer.onCardGoesToGraveyard( Card.find( cardId ) )
		#console.log( "onCardGoesToGraveyard", Card.find( cardId ) );

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
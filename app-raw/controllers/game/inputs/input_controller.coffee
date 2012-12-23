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


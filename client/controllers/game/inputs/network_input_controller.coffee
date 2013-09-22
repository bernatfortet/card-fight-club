class @NetworkInputController extends InputController
	server: null
	
	constructor: ->
		super
		this.setListeners()

	setListeners: () ->
		#Deck
		gameStream.on 'onDeckIsCreated', 					this.onDeckIsCreated

		#Cards
		gameStream.on 'onCardIsCreated', 					this.onCardIsCreated
		gameStream.on 'onCardIsRemoved', 					this.onCardIsRemoved
		gameStream.on 'onCardIsMoved', 						this.onCardIsMoved
		gameStream.on 'onCardIsTapped',						this.onCardIsTapped
		gameStream.on 'onCardIsFlippedUp', 					this.onCardIsFlippedUp
		gameStream.on 'onCardIsFlippedDown', 				this.onCardIsFlippedDown
		gameStream.on 'onCardAreaIsChanged', 				this.onCardAreaIsChanged
		gameStream.on 'onCardFromAreaIsRevealedToggle', 	this.onCardFromAreaIsRevealedToggle

		#Chat
		gameStream.on 'onChatMsgIsReceived', 				this.onChatMsgIsReceived

		#Gameplay
		gameStream.on 'onTurnIsReceived', 					this.onTurnIsReceived
		gameStream.on 'onDiceIsThrown', 					this.onDiceIsThrown

		#Counters
		gameStream.on 'onCounterIsCreated', 				this.onCounterIsCreated
		gameStream.on 'onCounterIsRemoved', 				this.onCounterIsRemoved
		gameStream.on 'onCounterIsMoved', 					this.onCounterIsMoved
		gameStream.on 'onCounterIsSet', 					this.onCounterIsSet
		gameStream.on 'onCounterIsAttachedToCard', 			this.onCounterIsAttachedToCard
		gameStream.on 'onCounterIsUnattached', 				this.onCounterIsUnattached


	#Deck
	onDeckIsCreated: ( deckData ) =>
		if( this.targetPlayer.deck == null )
			this.onCreateDeck( deckData )


	#Cards		
	onCardIsCreated: ( params ) =>
		app.gameController.chatController.renderDrawFromArea( params )
		cardModel = Card.create( id: params.cardId, image_url: params.image_url, name: params.name, deck: this.targetPlayer.deck.id, areaId: this.targetPlayer.deckController.item.id, controller: null  )
		this.onCreateCard( cardModel )

	onCardIsRemoved: ( params ) =>
		this.onRemoveCard( params.cardId )

	onCardIsMoved: ( params ) =>
		console.log 'params'
		this.onMoveCard( params.cardId, params.location )

	onCardAreaIsChanged: ( params ) =>
		app.gameController.chatController.renderCardAreaChanges( params )
		areaId = this.getPlayersAreaIdFromName( params.areaName, this.targetPlayer )
		this.onChangeCardArea( params.cardId, areaId )

	onCardIsTapped: ( params ) =>
		app.gameController.chatController.renderTapMsg( params )
		this.onTapCard( params.cardId )

	onCardIsUntapped: ( params ) =>
		app.gameController.chatController.renderUntapMsg( params )
		this.onUntapCard( params.cardId )

	onCardIsFlippedUp: ( params ) =>
		app.gameController.chatController.renderFlipUpMsg( params )
		this.onFlipCardUp( params.cardId )

	onCardIsFlippedDown: ( params ) =>
		app.gameController.chatController.renderFlipDownMsg( params )
		this.onFlipCardDown( params.cardId )

	onCardFromAreaIsRevealedToggle: ( params ) =>
		areaId = this.getPlayersAreaIdFromName( params.areaName, this.targetPlayer )
		this.onToggleRevealCardFromArea( params.cardId, areaId )


	#Chat
	onChatMsgIsReceived: ( params ) =>
		app.gameController.chatController.renderChatMsg( params )


	#Gameplay
	onTurnIsReceived: ( params ) =>
		app.gameController.chatController.renderTurnPassing( params )
		app.gameController.humanInputController.onReceiveTurn()

	onDiceIsThrown: ( params ) =>
		app.gameController.chatController.renderThrowDice( params )
		app.gameController.soundController.playSound("throwDice")


	#Counters
	onCounterIsCreated: ( params ) =>
		counterModel = Counter.create( id: params.counterId, number: params.counterNumber,  attached_card_id: params.cardId, controller: null )
		this.onCreateCounter(counterModel);

	onCounterIsRemoved: ( params ) =>
		this.onRemoveCounter( params.counterId );

	onCounterIsMoved: ( params ) =>
		this.onMoveCounter( params.counterId, params.location );

	onCounterIsSet: ( params ) =>		
		this.onSetCounter( params.counterId, params.counterNumber );

	onCounterIsAttachedToCard: ( params ) =>		
		this.onAttachCounterToCard( params.counterId, params.cardId )

	onCounterIsUnattached: ( params ) =>		
		this.onUnattachCounter( params.counterId );

	#Utils
	getPlayersAreaIdFromName: ( areaName, player ) ->
		areaId = null
		Area.each ( area ) =>
			if( areaName == area.name && area.controller.player  == player )
				areaId = area.id

		return areaId

	getRealId: ( id ) ->
		if( id[0] == "o")
			id = id.slice(1, id.length )
		return id
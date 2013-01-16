class NetworkInputController extends InputController
	server: null
	
	constructor: ->
		super

		this.server = io.connect('http:'+serverIp+':8080')

		this.setListeners()

	setListeners: () ->
		this.server.on 'onDeckIsCreated', 					this.onDeckIsCreated
		this.server.on 'onCardIsCreated', 					this.onCardIsCreated
		this.server.on 'onCardIsRemoved', 					this.onCardIsRemoved
		this.server.on 'onCardIsMoved', 					this.onCardIsMoved
		this.server.on 'onCardIsTapped',					this.onCardIsTapped
		this.server.on 'onCardIsFlippedUp', 				this.onCardIsFlippedUp
		this.server.on 'onCardIsFlippedDown', 				this.onCardIsFlippedDown
		this.server.on 'onCardAreaIsChanged', 				this.onCardAreaIsChanged
		this.server.on 'onCardFromAreaIsRevealedToggle', 	this.onCardFromAreaIsRevealedToggle
		this.server.on 'onChatMsgIsReceived', 				this.onChatMsgIsReceived
		this.server.on 'onTurnIsReceived', 					this.onTurnIsReceived

	onDeckIsCreated: ( deckData ) =>
		if( this.targetPlayer.deck == null )
			this.onCreateDeck( deckData )
			
	onCardIsCreated: ( params ) =>
		app.gameController.chatController.renderDrawFromArea( params )
		cardModel = Card.create( id: params.cardId, image_url: params.image_url, name: params.name, deck: this.targetPlayer.deck.id, areaId: this.targetPlayer.deckController.item.id, controller: null  )
		this.onCreateCard( cardModel )

	onCardIsRemoved: ( params ) =>
		this.onRemoveCard( params.cardId )

	onCardIsMoved: ( params ) =>
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

	onChatMsgIsReceived: ( params ) =>
		app.gameController.chatController.renderChatMsg( params )

	onTurnIsReceived: ( params ) =>
		app.gameController.chatController.renderTurnPassing( params )
		app.gameController.humanInputController.onReceiveTurn()

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
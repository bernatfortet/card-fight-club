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

	onDeckIsCreated: ( deckData ) =>
		if( this.targetPlayer.deck == null )
			this.onCreateDeck( deckData )
			
	onCardIsCreated: ( params ) =>
		cardModel = Card.create( id: params.cardId, image_url: params.image_url, name: params.name, deck: this.targetPlayer.deck.id, areaId: this.targetPlayer.deckController.item.id, controller: null  )
		this.onCreateCard( cardModel )

	onCardIsRemoved: ( params ) =>
		this.onRemoveCard( cardId.cardId )

	onCardIsMoved: ( params ) =>
		this.onMoveCard( params.cardId, params.location )

	onCardAreaIsChanged: ( params ) =>
		areaId = this.getPlayersAreaIdFromName( params.areaName, this.targetPlayer )
		this.onChangeCardArea( params.cardId, areaId )

	onCardIsTapped: ( params ) =>
		this.onTapCard( params.cardId )

	onCardIsFlippedUp: ( params ) =>
		this.onFlipCardUp( params.cardId )

	onCardIsFlippedDown: ( params ) =>
		this.onFlipCardDown( params.cardId )

	onCardFromAreaIsRevealedToggle: ( params ) =>
		areaId = this.getPlayersAreaIdFromName( params.areaName, this.targetPlayer )
		this.onToggleRevealCardFromArea( params.cardId, areaId )

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

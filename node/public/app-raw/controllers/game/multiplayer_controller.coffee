class MultiplayerController extends Spine.Controller
	server: null
	local: false

	constructor: ->
		super

		this.server = io.connect('http:'+serverIp+':8080')

	# Deck
	onCreateDeck: ( deckModel ) ->
		cards = new Object
		iCounter = 0
		Card.each ( card ) =>
			if( card.deckId == deckModel.id )
				cards[iCounter] =
					id: this.setIdForOpponent( card.id )
					card_id: card.card_id
					image_url: card.image_url
					name: card.name
				iCounter++

		params = 
			id: this.setIdForOpponent( deckModel.id )
			name: deckModel.name
			cards: cards

		this.sendEvent( "onCreateDeck", params )

		app.gameController.networkInputController.onDeckIsCreated( params ) if localServer
		console.log("Deck is Created", params );


	# Cards
	onCreateCard: ( cardModel ) ->
		cardId = this.setIdForOpponent( cardModel.id )
		params = 
			cardId: cardId
			image_url: cardModel.image_url
			name: cardModel.name
		this.sendEvent( "onCreateCard", params )
		app.gameController.networkInputController.onCardIsCreated( params ) if localServer

		console.log("Card is Created", params );

	onRemoveCard: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		params = 
			cardId: opponentCardId

		this.sendEvent( "onRemoveCard", params )

		app.gameController.networkInputController.onCardIsRemoved( params ) if localServer
		console.log( "Card has been Removed ", params );

	onMoveCard: ( cardModel ) ->
		invertedLocation = cardModel.controller.getLocation()
		invertedLocation.y = 1 - invertedLocation.y
		opponentCardId = this.setIdForOpponent( cardModel.id )

		params =
			cardId: opponentCardId
			location: invertedLocation
		this.sendEvent( "onMoveCard", params )

		app.gameController.networkInputController.onCardIsMoved( params ) if localServer
		console.log( "Card has moved ", opponentCardId );
 
	onCardChangesArea: ( cardModel, areaModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		params =
			cardId: opponentCardId
			previousAreaName: Area.find( cardModel.previousAreaId ).name
			areaName: areaModel.name

		this.sendEvent( "onCardChangesArea", params )

		app.gameController.networkInputController.onCardAreaIsChanged( params ) if localServer
		console.log( "Card has changed area ", params );

	onTapCard: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		params = 
			cardId: opponentCardId

		this.sendEvent( "onTapCard", params )

		app.gameController.networkInputController.onCardIsTapped( params ) if localServer
		console.log( "Card has tapped ", params );

	onUntapCard: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		params = 
			cardId: opponentCardId

		this.sendEvent( "onUntapCard", params )

		app.gameController.networkInputController.onCardIsUntapped( params ) if localServer
		console.log( "Card has untapped ", params );

	onFlipCardUp: ( cardModel ) ->
		return if( Area.find( cardModel.areaId).name == "hand" )
		opponentCardId = this.setIdForOpponent( cardModel.id )
		params = 
			cardId: opponentCardId

		this.sendEvent( "onFlipCardUp", params )

		app.gameController.networkInputController.onCardIsFlippedUp( params ) if localServer
		console.log( "Card has flipped Up ", params );

	onFlipCardDown: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		params = 
			cardId: opponentCardId
			
		this.sendEvent( "onFlipCardDown", params )

		app.gameController.networkInputController.onCardIsFlippedDown( params ) if localServer
		console.log( "Card has flipped Down ", params );


	# Areas
	onShuffle: ( area ) ->
		#this.sendEvent( "onMoveCard", area )
		console.log( "Area has shuffled ", area.name, area.id);

	onToggleRevealCardFromArea: ( cardModel, areaModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		params =
			cardId: opponentCardId
			areaName: areaModel.name
		this.sendEvent( "onToggleRevealCardFromArea", params )

		app.gameController.networkInputController.onCardFromAreaIsRevealedToggle( params ) if localServer
		console.log( "Area has revealed top card ", params );


	# Chat
	onSendChatMsg: ( msg ) ->
		params =
			userName: User.first().name
			msg: msg

		this.sendEvent( "onSendChatMsg", params )

		app.gameController.networkInputController.onChatMsgIsReceived( params ) if localServer
		console.log( "Player says:  ", params );


	# Gameplay
	onPassTurn: () ->
		params = {}
		this.sendEvent( "onPassTurn", params )

		app.gameController.networkInputController.onTurnIsReceived( params ) if localServer
		console.log( "Player Passes Turn  " );

	onThrowDice: ( diceResult ) ->
		params =
			diceResult: diceResult
		this.sendEvent( "onThrowDice", params )

		app.gameController.networkInputController.onDiceIsThrown( params ) if localServer
		console.log( "Player Throws Dice ", diceResult );

	# Counters
	onCreateCounter: ( counterModel ) =>
		counterId = this.setIdForOpponent( counterModel.id )

		params = 
			counterId: counterId
			attached_card_id: counterModel.attachedCardId?

		this.sendEvent( "onCreateCounter", params )
		app.gameController.networkInputController.onCounterIsCreated( params ) if localServer

		console.log("Counter is Created", params );

	onRemoveCounter: ( counterModel ) =>
		opponentCounterId = this.setIdForOpponent( counterModel.id )
		params = 
			counterId: opponentCounterId

		this.sendEvent( "onRemoveCounter", params )

		app.gameController.networkInputController.onCounterIsRemoved( params ) if localServer
		console.log( "Card has been Removed ", params );

	onMoveCounter: ( counterModel ) =>
		invertedLocation = counterModel.controller.getLocation()
		invertedLocation.y = 1 - invertedLocation.y
		opponentCounterId = this.setIdForOpponent( counterModel.id )

		params =
			counterId: opponentCounterId
			location: invertedLocation
		this.sendEvent( "onMoveCounter", params )

		app.gameController.networkInputController.onCounterIsMoved( params ) if localServer
		console.log( "Counter has moved ", params );

	onSetCounter: ( counterModel ) =>	
		opponentCounterId = this.setIdForOpponent( counterModel.id )
		params =
			counterId: opponentCounterId
			counterNumber: counterModel.number

		this.sendEvent( "onSetCounter", params )

		app.gameController.networkInputController.onCounterIsSet( params ) if localServer
		console.log( "Counter has moved ", params );

	onAttachCounterToCard: ( counterModel, cardModel ) =>
		opponentCounterId 	= this.setIdForOpponent( counterModel.id )
		opponentCardId	 	= this.setIdForOpponent( cardModel.id )
		params =
			counterId: opponentCounterId
			cardId: opponentCardId

		this.sendEvent( "onAttachCounterToCard", params )

		app.gameController.networkInputController.onCounterIsAttachedToCard( params ) if localServer
		console.log( "Counter is Attached  ", params );

	onUnattachCounter: ( counterModel ) =>
		opponentCounterId = this.setIdForOpponent( counterModel.id )
		params = 
			counterId: opponentCounterId

		this.sendEvent( "onUnattachCounter", params )

		app.gameController.networkInputController.onCounterIsUnattached( params ) if localServer
		console.log( "Counter is Unattached ", params );

	# Utils
	setIdForOpponent: ( id ) ->
		if( id[0] != "o")
			id = "o".concat( id )
		return id

	sendEvent: ( event, params ) ->
		params.userName = User.first().name
		this.server.emit( event, params ) if !localServer

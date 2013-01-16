class MultiplayerController extends Spine.Controller
	server: null
	local: false

	constructor: ->
		super

		this.server = io.connect('http:'+serverIp+':8080')

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

	onSendChatMsg: ( msg ) ->
		params =
			userName: User.first().name
			msg: msg

		this.sendEvent( "onSendChatMsg", params )

		app.gameController.networkInputController.onChatMsgIsReceived( params ) if localServer
		console.log( "Player says:  ", params );

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

	#Tools
	setIdForOpponent: ( id ) ->
		if( id[0] != "o")
			id = "o".concat( id )
		return id

	sendEvent: ( event, params ) ->
		params.userName = User.first().name
		this.server.emit( event, params ) if !localServer

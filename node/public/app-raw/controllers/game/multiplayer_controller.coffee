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

		deckData = 
			id: this.setIdForOpponent( deckModel.id )
			name: deckModel.name
			cards: cards

		this.sendEvent( "onCreateDeck", deckData )

		app.gameController.networkInputController.onDeckIsCreated( deckData ) if this.local
		console.log("Deck is Created", deckData );

	onCreateCard: ( cardModel ) ->
		cardId = this.setIdForOpponent( cardModel.id )
		this.sendEvent( "onCreateCard", cardId )
		app.gameController.networkInputController.onCardIsCreated( cardId ) if this.local

		console.log("Card is Created", cardModel );

	onRemoveCard: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		this.sendEvent( "onRemoveCard", opponentCardId )

		app.gameController.networkInputController.onCardIsRemoved( opponentCardId ) if this.local
		console.log( "Card has been Removed ", opponentCardId );

	onMoveCard: ( cardModel ) ->
		invertedLocation = cardModel.controller.getLocation()
		invertedLocation.y = 1 - invertedLocation.y
		opponentCardId = this.setIdForOpponent( cardModel.id )

		params =
			cardId: opponentCardId
			location: invertedLocation
		this.sendEvent( "onMoveCard", params )

		app.gameController.networkInputController.onCardIsMoved( params ) if this.local
		console.log( "Card has moved ", opponentCardId );
 
	onCardChangesArea: ( cardModel, areaModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		params =
			cardId: opponentCardId
			areaName: areaModel.name

		this.sendEvent( "onCardChangesArea", params )

		app.gameController.networkInputController.onCardAreaIsChanged( params ) if this.local
		console.log( "Card has changed area ", params );

	onTapCard: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		
		this.sendEvent( "onTapCard", opponentCardId )

		app.gameController.networkInputController.onCardIsTapped( opponentCardId ) if this.local
		console.log( "Card has tapped ", opponentCardId );

	onFlipCardUp: ( cardModel ) ->
		return if( Area.find( cardModel.areaId).name == "hand" )

		opponentCardId = this.setIdForOpponent( cardModel.id )
		this.sendEvent( "onFlipCardUp", opponentCardId )

		app.gameController.networkInputController.onCardIsFlippedUp( opponentCardId ) if this.local
		console.log( "Card has flipped Up ", opponentCardId );

	onFlipCardDown: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		this.sendEvent( "onFlipCardDown", opponentCardId )

		app.gameController.networkInputController.onCardIsFlippedDown( opponentCardId ) if this.local
		console.log( "Card has flipped Down ", opponentCardId );

	onShuffle: ( area ) ->
		#this.sendEvent( "onMoveCard", area )
		console.log( "Area has shuffled ", area.name, area.id);

	onToggleRevealCardFromArea: ( cardModel, areaModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		params =
			cardId: opponentCardId
			areaName: areaModel.name
		this.sendEvent( "onToggleRevealCardFromArea", params )

		app.gameController.networkInputController.onCardFromAreaIsRevealedToggle( params ) if this.local
		console.log( "Area has revealed top card ", params );

	setIdForOpponent: ( id ) ->
		if( id[0] != "o")
			id = "o".concat( id )
		return id

	sendEvent: ( event, params ) ->
		this.server.emit( event, params ) if !this.local

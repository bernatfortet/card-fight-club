class MultiplayerController extends Spine.Controller
	server: null
	local: true

	constructor: ->
		super

		#this.server = io.connect('http:localhost:8080')

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
		this.sendEvent( "onCreateCard", cardModel )
		cardId = this.setIdForOpponent( cardModel.id )
		app.gameController.networkInputController.onCardIsCreated( cardId ) if this.local

		console.log("Card is Created", cardModel );

	onShuffle: ( area ) ->
		#this.sendEvent( "onMoveCard", area )
		console.log( "Area has shuffled ", area.name, area.id);

	onMoveCard: ( cardModel ) ->
		invertedLocation = cardModel.controller.getLocation()
		invertedLocation.y = 1 - invertedLocation.y
		opponentCardId = this.setIdForOpponent( cardModel.id )

		this.sendEvent( "onMoveCard", opponentCardId, invertedLocation )

		app.gameController.networkInputController.onCardIsMoved( opponentCardId, invertedLocation )
		console.log( "Card has moved ", opponentCardId );

	onCardChangesArea: ( area ) ->
		this.sendEvent( "onMoveCard", area )
		console.log( "Card has changed area ", area.name, area.id);

	onTapCard: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		
		this.sendEvent( "onTapCard", opponentCardId )

		app.gameController.networkInputController.onCardIsTapped( opponentCardId )
		console.log( "Card has tapped ", opponentCardId );

	onFlipCardUp: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		this.sendEvent( "onFlipCardUp", opponentCardId )

		app.gameController.networkInputController.onCardIsFlippedUp( opponentCardId )
		console.log( "Card has flipped Up ", opponentCardId );

	onFlipCardDown: ( cardModel ) ->
		opponentCardId = this.setIdForOpponent( cardModel.id )
		this.sendEvent( "onFlipCardDown", opponentCardId )

		app.gameController.networkInputController.onCardIsFlippedDown( opponentCardId )
		console.log( "Card has flipped Down ", opponentCardId );

	setIdForOpponent: ( id ) ->
		if( id[0] != "o")
			id = "o".concat( id )
		return id

	sendEvent: ( event, params ) ->
		#this.server.emit( event, params ) if !this.local

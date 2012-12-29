class NetworkInputController extends InputController

	constructor: ->
		super

		this.server = io.connect('http:localhost:8080')

		this.setListeners()

	setListeners: () ->
		this.server.on 'onDeckIsCreated', 		this.onDeckIsCreated
		this.server.on 'onCardIsCreated', 		this.onCardIsCreated
		this.server.on 'onCardIsMoved', 		this.onCardIsMoved
		this.server.on 'onCardIsTapped',		this.onCardIsTapped
		this.server.on 'onCardIsFlippedUp', 	this.onCardIsFlippedUp
		this.server.on 'onCardIsFlippedDown', 	this.onCardIsFlippedDown

	onDeckIsCreated: ( deck ) =>
		Deck.create(
			name: deck.name, 
			id: deck.id
			cards: deck.cards
			controller: this.targetPlayer.deckController
		)

	onCardIsCreated: ( cardId ) =>
		realModel = Card.find( this.getRealId( cardId ) )
		cardModel = Card.create( id: cardId, image_url: realModel.image_url, name: realModel.name, deck: realModel.deckId, areaId: this.targetPlayer.deckController.item.id, controller: null  )
		this.onCreateCard( cardModel )

	onCardIsMoved: ( params ) =>
		this.onMoveCard( params.cardId, params.location )

	onCardAreaIsChanged: ( params ) =>
		this.onCardChangesArea( params.cardId, params.areaId )

	onCardIsTapped: ( cardId ) =>
		this.onTapCard( cardId )

	onCardIsFlippedUp: ( cardId ) =>
		this.onFlipCardUp( cardId )

	onCardIsFlippedDown: ( cardId ) =>
		this.onFlipCardDown( cardId )

	getRealId: ( id ) ->
		if( id[0] == "o")
			id = id.slice(1, id.length )
		return id

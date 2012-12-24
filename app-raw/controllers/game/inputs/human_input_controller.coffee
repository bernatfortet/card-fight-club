class HumanInputController extends InputController

	activeCard: null
	cardOriginalArea: null
	cardFinalArea: null

	constructor: ->
		super
		
		this.setListeners()


	setListeners: ->
		$(".Card").draggable({
			stop: this.onCardDragStops
			snap: ".Hand, .Deck, .Graveyard"
			snapMode: "inner"
		})

		$(".Hand").droppable({
			drop: this.onDropCardOnHand
		})

		$(".Board").droppable({
			drop: this.onDropCardOnBoard
		})

		$(".Deck").droppable({
			drop: this.onDropCardOnDeck
		})

		$(".Graveyard").droppable({
			drop: this.onDropCardOnGraveyard
		})

		$(".Card").on("dblclick", this.onDoubleClick )
		$(".Card").on("contextmenu", this.onRightMouseClick )

		$(".Card").on("mouseover", this.onMouseOverCard )
		$(".Card").on("mouseout", this.onMouseOutCard )

	onRightMouseClick: ( event ) =>
		RIGHT_MOUSE_BUTTON = 3
		if( event.which == RIGHT_MOUSE_BUTTON )
			#event.preventDefault()
			this.onCardIsTapped( this.getCardId( event.currentTarget ) )

	onDoubleClick: (event) =>
		this.onCardIsFlipped( this.getCardId( event.currentTarget ) )

	onCardDragStops: ( event, ui )  =>
		cardPosition = ui.position # TODO Consider Changing this to something like Card.find(this.getCardId()).position
		this.onCardIsMoved( this.getCardId( event.target ), ui.position )	

	onDropCardOnHand: ( event, ui ) =>
		this.onCardGoesToHand( this.getCardId( ui.draggable ), ui.position )	
		console.log( "onDropCardOnHand");

	onDropCardOnBoard: ( event, ui ) =>
		this.onCardGoesToBoard( this.getCardId( ui.draggable ), ui.position )	
		console.log( "onDropCardOnBoard");

	onDropCardOnDeck: ( event, ui ) =>
		this.onCardGoesToDeck( this.getCardId( ui.draggable ), ui.position )	
		console.log( "onDropCardOnDeck");

	onDropCardOnGraveyard: ( event, ui ) =>
		this.onCardGoesToGraveyard( this.getCardId( ui.draggable ), ui.position )	
		console.log( "onDropCardOnDeck");
			
	onMouseOverCard: ( event ) =>
		this.activeCard = event.currentTarget
		this.onZoomCardIn( this.getCardId( this.activeCard ))
		#console.log( "onMouseOverCard", this.activeCard);

	onMouseOutCard: ( event ) =>
		this.activeCard = null
		this.onZoomCardOut()
		#console.log( "onMouseOutCard");

	getCardId: ( cardTarget ) ->
		card = $(cardTarget)
		cardId = card.data().id
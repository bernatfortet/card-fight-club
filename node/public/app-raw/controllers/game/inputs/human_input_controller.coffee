class HumanInputController extends InputController

	activeCard: null
	humanPlayer: null

	originalWidth: null
	originalHeight: null

	constructor: ->
		super

		this.originalWidth = $(window).width()
		this.originalHeight = $(window).height()

	setListeners: ->

		$(".Player .Area").droppable({
			drop: this.onDropCardOnArea
			hoverClass: ".Active"
		})

		$(".Player .Deck").on("dblclick", this.onDoubleClickDeck )

		$.contextMenu({
			selector: ".Player .CardPile"
			items:
				shuffle:
					name: "Shuffle"
					callback: this.onShuffleArea
				view:
					name: "View Cards"
					callback: this.onViewCardsFromArea
				#reveal:
				#	name: "Reveal Top Card"
				#topToBottom:
				#	name: "Put Top Card to Bottom"
				#bottomToTop:
				#	name: "Put Bottom Card to Top"
		})

		$(".Player .Graveyard").droppable({
			drop: this.onDropCardOnGraveyard
		})

	setCardListeners: ( cardElement ) ->
		cardElement.draggable({
			stop: this.onCardDragStops
			snap: ".Hand, .Deck, .Graveyard"
			snapMode: "inner"
			stack: ".Card"
		})
		cardElement.on("dblclick", this.onDoubleClickCard )
		cardElement.on("contextmenu", this.onRightMouseClick )

		this.setCardHoverListener( cardElement )

	setCardHoverListener: ( cardElement ) ->
		cardElement.on("mouseover", this.onMouseOverCard )
		cardElement.on("mouseout", this.onMouseOutCard )

	onRightMouseClick: ( event ) =>
		RIGHT_MOUSE_BUTTON = 3
		if( event.which == RIGHT_MOUSE_BUTTON )
			#event.preventDefault()
			this.onTapCard( this.getCardId( event.currentTarget ) )

	onDoubleClickCard: ( event ) =>
		flipState = $(event.currentTarget).attr("data-flipped")
		if( flipState == "up")
			this.onFlipCardDown( this.getCardId( event.currentTarget ) )
		else
			this.onFlipCardUp( this.getCardId( event.currentTarget ) )

	onDoubleClickDeck: () =>
		this.onDrawCard()

	onCardDragStops: ( event, ui )  =>
		cardPosition = ui.position # TODO Consider Changing this to something like Card.find(this.getCardId()).position
		location = 
			x: ui.position.left / $(window).width()
			y: ui.position.top / $(window).height()
		this.onMoveCard( this.getCardId( event.target ), location )	

	onDropCardOnArea: ( event, ui ) =>
		areaId = $(event.target).data().areaId
		this.onCardChangesArea( this.getCardId( ui.draggable ), areaId )	

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
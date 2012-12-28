class HumanInputController extends InputController

	activeCard: null
	humanPlayer: null

	constructor: ->
		super

	setListeners: ->

		$(".Player .Area").droppable({
			drop: this.onDropCardOnArea
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
		})
		cardElement.on("dblclick", this.onDoubleClickCard )
		cardElement.on("contextmenu", this.onRightMouseClick )

		cardElement.on("mouseover", this.onMouseOverCard )
		cardElement.on("mouseout", this.onMouseOutCard )

	onRightMouseClick: ( event ) =>
		RIGHT_MOUSE_BUTTON = 3
		if( event.which == RIGHT_MOUSE_BUTTON )
			#event.preventDefault()
			this.onCardIsTapped( this.getCardId( event.currentTarget ) )

	onDoubleClickCard: ( event ) =>
		this.onCardIsFlipped( this.getCardId( event.currentTarget ) )

	onDoubleClickDeck: () =>
		this.onDrawCard()

	onCardDragStops: ( event, ui )  =>
		cardPosition = ui.position # TODO Consider Changing this to something like Card.find(this.getCardId()).position
		this.onMoveCard( this.getCardId( event.target ), ui.position )	

	onDropCardOnArea: ( event, ui ) =>
		areaId = $(event.target).data().areaId
		this.onCardGoesToArea( this.getCardId( ui.draggable ), areaId )	

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
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
			drop: this.onCardChangesArea
			hoverClass: "Active"
		})

		$(".Area").on("mouseover", this.onMouseOverArea )
		$(".Area").on("mouseout", this.onMouseOutArea )

		$(".CardPile").on("dblclick", this.onDoubleClickArea )

		$.contextMenu({
			selector: ".Player .CardPile"
			items:
				shuffle:
					name: "Shuffle"
					callback: this.onShuffleArea
				view:
					name: "View Cards"
					callback: this.onViewCardsFromArea
				reveal:
					name: "Reveal / Unreveal Top Card"
					callback: this.onTopCardFromAreaIsRevealedToggle
				#topToBottom:
				#	name: "Put Top Card to Bottom"
				#bottomToTop:
				#	name: "Put Bottom Card to Top"
		})

		this.setKeyboardListeners()

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

	setKeyboardListeners: () =>
		jwerty.key( '1', => this.onAddNCards(1) )
		jwerty.key( '2', => this.onAddNCards(2) )
		jwerty.key( '3', => this.onAddNCards(3) )
		jwerty.key( '4', => this.onAddNCards(4) )
		jwerty.key( '5', => this.onAddNCards(5) )
		jwerty.key( '6', => this.onAddNCards(6) )
		jwerty.key( '7', => this.onAddNCards(7) )

	onAddNCards: ( numCards ) =>
		for iCounter in [0...numCards]
			this.onDrawCard()

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

	onDoubleClickArea: ( event ) =>
		areaId = $(event.target).data().areaId
		this.onDrawCardFromArea( areaId )

	onMouseOverArea: ( event ) =>
		areaId = $(event.target).data().areaId
		Area.find( areaId ).controller.onMouseOver()

	onMouseOutArea: ( event ) =>
		areaId = $(event.target).data().areaId
		Area.find( areaId ).controller.onMouseOut()

	onCardDragStops: ( event, ui )  =>
		cardPosition = ui.position # TODO Consider Changing this to something like Card.find(this.getCardId()).position
		location = 
			x: ui.position.left / $(window).width()
			y: ui.position.top / $(window).height()
		this.onMoveCard( this.getCardId( event.target ), location )	

	onCardChangesArea: ( event, ui ) =>
		areaId = $(event.target).data().areaId
		this.onChangeCardArea( this.getCardId( ui.draggable ), areaId )

	onTopCardFromAreaIsRevealedToggle: ( key, opt ) =>
		areaId = opt.$trigger.data().areaId
		this.onToggleRevealTopCardFromArea( areaId )

	onMouseOverCard: ( event ) =>
		this.activeCard = event.currentTarget
		this.onZoomCardIn( this.getCardId( this.activeCard ))

	onMouseOutCard: ( event ) =>
		this.activeCard = null
		this.onZoomCardOut()

	getCardId: ( cardTarget ) ->
		card = $(cardTarget)
		cardId = card.data().id
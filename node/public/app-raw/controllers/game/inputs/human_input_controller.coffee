class HumanInputController extends InputController

	activeCard: null
	humanPlayer: null

	constructor: ->
		super

	setListeners: ->

		$(".Player .Area").droppable({
			drop: this.onCardChangesArea
			hoverClass: "Active"
		})

		$(".Area").on("mouseover", this.onMouseOverArea )
		$(".Area").on("mouseout", this.onMouseOutArea )

		$(".Player .CardPile").on("dblclick", this.onDoubleClickArea )

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

		$(".Chat").on("click", =>
			$(".Chat input").focus()
			app.gameController.chatController.flashInput();
		)

		$(".Chat input").on("keydown", jwerty.event('enter', (event) =>
			this.sendChatMsg( event )
			$(".Chat input").val("");
		))

		this.setKeyboardListeners()
		this.setElementListeners()

		$(window).on("resize", this.onResize )

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
		$('body').bind('keyup', jwerty.event('ctrl+1', => this.onAddNCards(1) ));
		$('body').bind('keyup', jwerty.event('ctrl+2', => this.onAddNCards(2) ));
		$('body').bind('keyup', jwerty.event('ctrl+3', => this.onAddNCards(3) ));
		$('body').bind('keyup', jwerty.event('ctrl+4', => this.onAddNCards(4) ));
		$('body').bind('keyup', jwerty.event('ctrl+5', => this.onAddNCards(5) ));
		$('body').bind('keyup', jwerty.event('ctrl+6', => this.onAddNCards(6) ));
		$('body').bind('keyup', jwerty.event('ctrl+7', => this.onAddNCards(7) ));

		$('body').bind('keyup', jwerty.event('R', => 
			if ( confirm ("Are sure you want to reset?") )
				app.gameController.reset()
		));

	onAddNCards: ( numCards ) =>
		for iCounter in [0...numCards]
			this.onDrawCardFromArea( this.targetPlayer.deckArea.id )

	onRightMouseClick: ( event ) =>
		RIGHT_MOUSE_BUTTON = 3
		if( event.which == RIGHT_MOUSE_BUTTON )
			if( !debugApp )
				event.preventDefault()

			tapState = $(event.currentTarget).attr("data-tapped")

			if( tapState == "true")
				this.onUntapCard( this.getCardId( event.currentTarget ) )
			else
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

	setElementListeners: () ->
		$(".Draggable").draggable();

		$(".NumberA input").on("keydown", jwerty.event('enter', (event) =>
			this.onSubmitNumber( event )
		))


		$(".NumberA input").on('submit', this.onSubmitNumber );

	onSubmitNumber: ( event ) =>
		console.log(" asdf");

	onResize: ( event ) =>
		console.log("OnResize");
		$(".Playzone").width( $("#WebsiteApp").width() - $(".Sidebar").outerWidth(); )

		handOuterHeight = $(".Player .Hand").outerHeight() + parseFloat($(".Player .Hand").css("bottom")) + 18
		boardHeight =  $(".Player").outerHeight() - handOuterHeight 

		$(".Board").height( boardHeight )

		$(".Board, .Hand").width( $(".Deck").offset().left - 20 )

	sendChatMsg: ( event ) =>
		msg = $(event.target).val()
		params = 
			userName: User.first().name
			msg: msg

		app.gameController.chatController.renderChatMsg( params )
		app.gameController.multiplayerController.onSendChatMsg( msg )

	getCardId: ( cardTarget ) ->
		card = $(cardTarget)
		cardId = card.data().id
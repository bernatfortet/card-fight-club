class HumanInputController extends InputController

	activeCard: null
	humanPlayer: null

	constructor: ->
		super

	setListeners: ->

		$(".HumanPlayer .Area").droppable({
			drop: this.onElementDropsOnArea
			hoverClass: "Active"
		})

		$(".Area").on("mouseover", this.onMouseOverArea )
		$(".Area").on("mouseout", this.onMouseOutArea )

		$(".HumanPlayer .CardPile").on("dblclick", this.onDoubleClickArea )


		$(".HumanPlayer .CardPile").draggable(
			helper: "clone"
			stop: ( event, ui ) =>
				originCardPileClone = $(ui.helper)
				cardLocation = 
					x: originCardPileClone.offset().left / $(window).width()
					y: originCardPileClone.offset().top / $(window).height()

				areaModel = Area.find( $(event.target).data().areaId )
				cardController = this.targetPlayer.createCardFromTopOfArea( areaModel )
				this.onMoveCard( cardController.item.id, cardLocation )
				originCardPileClone.remove()
		)

		$.contextMenu({
			selector: ".HumanPlayer .CardPile"
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
		this.setChatListeners()
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
		cardElement.on("contextmenu", this.onRightMouseClickCard )

		cardElement.find(".TapContainer").droppable({
			drop: this.onElementDropsOnCard
			hoverClass: "Active"
		})

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

		$('body').bind('keyup', jwerty.event('ctrl+M', (event) =>
			app.gameController.reset()
		));

	setChatListeners: () ->
		$(".Chat").on("click", =>
			$(".Chat input").focus()
			app.gameController.chatController.flashInput();
		)

		$(".Chat input").on("keydown", jwerty.event('enter', (event) =>
			this.sendChatMsg( event )
			$(".Chat input").val("");
		))

		$(".Chat .YourTurn").on("click", this.onPassTurn )


		$('body').bind('keyup', jwerty.event('ctrl+space', => 
			params = 
				userName: User.first().name

			app.gameController.chatController.renderTurnPassing( params )

			this.onPassTurn()
		));

	setElementListeners: () ->
		$(".NumberA input").on("keydown", jwerty.event('enter', (event) =>
			this.onSubmitNumber( event )
		))
		$(".CounterOrigin").draggable(
			helper: "clone"
			stop: ( event, ui ) =>
				originCounterClone = $(ui.helper)
				counterLocation = 
					x: originCounterClone.offset().left / $(window).width()
					y: originCounterClone.offset().top / $(window).height()

				counterController = this.createCounter()
				this.onMoveCounter( counterController.item.id, counterLocation )
				originCounterClone.remove()
		)

		Counter
		$(".NumberA input").on('submit', this.onSubmitNumber );

		$(".Dice").on("click", this.onThrowDice )

	onAddNCards: ( numCards ) =>
		for iCounter in [0...numCards]
			this.onDrawCardFromArea( this.targetPlayer.deckArea.id )

	onRightMouseClickCard: ( event ) =>
		RIGHT_MOUSE_BUTTON = 3
		if( event.which == RIGHT_MOUSE_BUTTON )
			if( !debugApp )
				event.preventDefault()

			tapState = $(event.currentTarget).attr("data-tapped")

			if( tapState == "true")
				this.onUntapCard( this.getTargetObjectId( event.currentTarget ) )
			else
				this.onTapCard( this.getTargetObjectId( event.currentTarget ) )

	onDoubleClickCard: ( event ) =>
		flipState = $(event.currentTarget).attr("data-flipped")
		if( flipState == "up")
			this.onFlipCardDown( this.getTargetObjectId( event.currentTarget ) )
		else
			this.onFlipCardUp( this.getTargetObjectId( event.currentTarget ) )

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
		cardPosition = ui.position
		location = 
			x: ui.position.left / $(window).width()
			y: ui.position.top / $(window).height()
		this.onMoveCard( this.getTargetObjectId( event.target ), location )	

	onElementDropsOnArea: ( event, ui ) =>
		dropedElement = $(ui.draggable)

		if( dropedElement.hasClass("Card") )
			areaId = $(event.target).data().areaId
			this.onChangeCardArea( this.getTargetObjectId( ui.draggable ), areaId )

		else if( dropedElement.hasClass("Counter") )
			counterId = this.getTargetObjectId( dropedElement )
			this.onUnattachCounter( counterId )




	onTopCardFromAreaIsRevealedToggle: ( key, opt ) =>
		areaId = opt.$trigger.data().areaId
		this.onToggleRevealTopCardFromArea( areaId )

	onMouseOverCard: ( event ) =>
		this.activeCard = event.currentTarget
		this.onZoomCardIn( this.getTargetObjectId( this.activeCard ))

	onMouseOutCard: ( event ) =>
		this.activeCard = null
		this.onZoomCardOut()


	onSubmitNumber: ( event ) =>
		console.log(" asdf");

	onResize: ( event ) =>
		console.log("OnResize");

		#Playzone Width
		$(".Playzone").width( $("#WebsiteApp").width() - $(".Sidebar").outerWidth(); )

		#Board Height
		handOuterHeight = $(".HumanPlayer .Hand").outerHeight() + parseFloat($(".HumanPlayer .Hand").css("bottom")) + 18
		$(".Board").height( $(".HumanPlayer").outerHeight() - handOuterHeight )

		#Board and Hand Width
		$(".Board, .Hand").width( $(".Deck").offset().left - 20	)

		#Converstaion Resize
		$(".Conversation").height(
			$(".Playzone").outerHeight() - 20 -(
				parseFloat($(".Conversation").css("top")) + 
				parseFloat($(".Chat .Input").css("bottom")) + $(".Chat .Input").outerHeight();
			)
		) 


	# Counters
	createCounter: () ->
		counterModel = Counter.create( number:0,  attached_card_id: null, controller: null )
		this.onCreateCounter( counterModel )

	setCounterListener: ( counterElement ) ->
		counterElement.draggable({
			stop: this.onCounterDragStops
			stack: ".Counter"
		})
		counterElement.on("mouseover", this.onMouseOverCounter )
		counterElement.on("click", this.onClickCounter )
		counterElement.on("dblclick", this.onDoubleClickCounter )
		#TODO when input changes triggerSet
		
	onCounterDragStops: ( event, ui )  =>
		counterPosition = $(ui.helper).offset()
		location = 
			x: counterPosition.left / $(window).width()
			y: counterPosition.top / $(window).height()
		this.onMoveCounter( this.getTargetObjectId( event.target ), location )	

	onMouseOverCounter: ( event ) =>
		counterController = this.getTargetCounterController( event.currentTarget )

	onClickCounter: ( event ) =>
		counterController = this.getTargetCounterController( event.currentTarget )

	onElementDropsOnCard: ( event, ui ) =>
		setTimeout( => #By using this timeout this event is fired last
			cardElement = $(event.target).closest(".Card")
			dropedElement = $(ui.draggable)

			if( dropedElement.hasClass("Counter") )
				cardId = this.getTargetObjectId( cardElement )
				counterId = this.getTargetObjectId( dropedElement )
				this.onAttachCounterToCard( counterId, cardId )
		, 0)


	# Chat
	sendChatMsg: ( event ) =>
		msg = $(event.target).val()
		params = 
			userName: User.first().name
			msg: msg

		app.gameController.chatController.renderChatMsg( params )
		app.gameController.multiplayerController.onSendChatMsg( msg )


	# Utils
	getTargetObjectId: ( target ) ->
		isJqueryObject = target instanceof jQuery
		if( isJqueryObject )
			targetId = target.data().id
		else 
			targetId = $(target).data().id

	getTargetCardController: ( target ) ->
		targetobjectId = this.getTargetObjectId( target )
		cardController = Card.find( targetobjectId ).controller

	getTargetCounterController: ( target ) ->
		targetobjectId = this.getTargetObjectId( target )
		counterController = Counter.find( targetobjectId ).controller
class HumanInputController extends InputController
	constructor: ->
		super
		
		this.setListeners()

	setListeners: ->
		$(".Card").draggable({
			stop: this.onCardDragStops
		})

		$(".Card").on("dblclick", this.onDoubleClick )
		$(".Card").on("contextmenu", this.onRightMouseClick )

	onRightMouseClick: ( event ) =>
		RIGHT_MOUSE_BUTTON = 3
		if( event.which == RIGHT_MOUSE_BUTTON )
			#event.preventDefault()
			this.onCardIsTapped( this.getCardId( event.target ) )

	onDoubleClick: (event) =>
		this.onCardIsFlipped( this.getCardId( event.target ) )

	onCardDragStops: ( event, ui )  =>
		cardPosition = ui.position # TODO Consider Changing this to something like Card.find(this.getCardId()).position
		this.onCardIsMoved( this.getCardId( event.target), ui.position )	

	getCardId: ( eventTarget ) ->
		card = $(eventTarget)
		cardId = card.data().id
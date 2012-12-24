class CardController extends Spine.Controller
	template: "CardTemplate"

	isTapped: false
	isFlippedUp: false

	constructor: ->
		super
		this.render()
		this.item.setController( this )

	render: ->
		this.el = ( $("#"+this.template).tmpl( this.item ) )

	move: ( posX, posY ) ->
		this.el.css("left", posX )
		this.el.css("top", posY )

	moveToDeck: () ->
		deckPosX = $(".Deck").offset().left
		deckPosY = $(".Deck").offset().top
		this.move( deckPosX, deckPosY )


	tap: =>
		if( this.el.attr("data-tapped") == "false" )
			this.el.attr("data-tapped", "true")
		else
			this.el.attr("data-tapped", "false")

	flip: =>
		if( this.el.attr("data-flipped") == "up" )
			this.flipDown()
		else
			this.flipUp()

	flipUp: =>
		this.el.attr("data-flipped", "up")
		this.isFlippedUp = true

	flipDown: =>
		this.el.attr("data-flipped", "down")
		this.isFlippedUp = false

	zoomIn: =>
		this.el.attr("data-zoom", "true")

	zoomOut: =>
		this.el.attr("data-zoom", "false")
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
		this.el.css("left", posX * 100 + "%" )
		this.el.css("top", posY * 100 + "%" )

	getLocation: ->
		cardLocation =
			x: this.el.offset().left / $(window).width()
			y: this.el.offset().top / $(window).height()

	tap: =>
		if( this.el.attr("data-tapped") != "true" )
			this.el.attr("data-tapped", "true")
		else
			this.el.attr("data-tapped", "false")

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


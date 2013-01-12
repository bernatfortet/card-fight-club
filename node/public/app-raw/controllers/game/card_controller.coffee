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
		this.setCardZindex()

	setCardZindex: ->
		this.el.css("z-index", parseInt( $(".Card").last().css("zIndex") ) + 1)

	move: ( posX, posY ) ->
		this.el.css("left", posX * 100 + "%" )
		this.el.css("top", posY * 100 + "%" )

	getLocation: ->
		xCenterPoint = this.el.offset().left
		yCenterPoint = this.el.offset().top + this.el.children().outerHeight()
		cardLocation =
			x: xCenterPoint / $(window).width()
			y: yCenterPoint / $(window).height()

	tap: =>
		this.el.attr("data-tapped", "true")
		this.isTapped = true

	untap: =>
		this.el.attr("data-tapped", "false")
		this.isTapped = false

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

	isVisible: =>
		return this.isFlippedUp

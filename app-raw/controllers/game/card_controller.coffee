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

	moveToArea: ( areaId ) ->
		areaModel = Area.find( areaId )
		this.item.setArea( areaModel.id )
		areaPosX = areaModel.controller.el.offset().left
		areaPosY = areaModel.controller.el.offset().top
		this.move( areaPosX, areaPosY )

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

	getLocation: =>
		location: 
			x: this.el.offset().left
			y: this.el.offset().top
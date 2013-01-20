class CounterController extends Spine.Controller
	template: "CounterTemplate"
	elements:
		"input": "input"

	constructor: ->
		super
		this.render()
		this.item.setController( this )

	render: ->
		this.el = ( $("#"+this.template).tmpl( this.item ) )
		this.setZindex()

	setZindex: ->
		this.el.css("z-index", parseInt( $(".Counter").last().css("zIndex") ) + 1)

	move: ( posX, posY ) ->
		this.el.css("left", posX * 100 + "%" )
		this.el.css("top", posY * 100 + "%" )

	getLocation: ->
		xCenterPoint = this.el.offset().left
		yCenterPoint = this.el.offset().top + this.el.outerHeight()
		location =
			x: xCenterPoint / $(window).width()
			y: yCenterPoint / $(window).height()

	set: ( number ) =>
		this.input.val( number )

	attachToCard: ( cardController ) =>
		#Work on this

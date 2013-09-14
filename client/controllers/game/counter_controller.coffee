class @CounterController extends Spine.Controller
	template: '
		<div class="counter blueCounter Counter" data-id="${id}">
			<div class="inner"></div>
		</div>
	'

	cardControllerAttachedTo: null
	isAttached: false

	elements:
		"input": "input"

	constructor: ->
		super
		this.render()
		this.item.setController( this )

	render: ->
		this.el =  $.tmpl( this.template, this.item )
		this.setZindex()

	setZindex: ->
		this.el.css("z-index", parseInt( $(".Counter").last().css("zIndex") ) + 1)

	move: ( posX, posY ) ->
		if( !this.isAttached )
			this.el.css("left", posX * 100 + "%" )
			this.el.css("top", posY * 100 + "%" )

	getLocation: ->
		xCenterPoint = this.el.offset().left
		yCenterPoint = this.el.offset().top + this.el.outerHeight()
		location =
			x: xCenterPoint / $(window).width()
			y: yCenterPoint / $(window).height()

	set: ( number ) ->
		this.input.val( number )

	attachToCard: ( cardController ) ->
		this.cardControllerAttachedTo = cardController
		this.isAttached = true

		this.el.appendTo( cardController.el )
		this.el.attr( "state", "Attached" )

		offsetXtoCard = this.el.offset().left - cardController.el.offset().left
		offsetYtoCard = this.el.offset().top - cardController.el.offset().top
		this.el.css("left", offsetXtoCard )
		this.el.css("top", offsetYtoCard )


	unattach: () ->
		offsetX = this.el.offset().left
		offsetY = this.el.offset().top
		this.el.css("left", offsetX )
		this.el.css("top", offsetY )

		player = this.getPlayer()
		this.el.appendTo( player.find(".Counters") )

		this.el.attr( "state", "" )

		this.cardControllerAttachedTo = null
		this.isAttached = false

		
	getPlayer: () ->
		player = this.el.closest(".Player")

	isElementPlayerOpponent:() ->
		if( this.getPlayer().hasClass("Opponent") )
			return true
		else
			return false
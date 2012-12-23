class CardController extends Spine.Controller
	
	template: "CardTemplate"
	constructor: ->
		super
		this.render()
		this.item.setController( this )

	render: ->
		this.el = ( $("#"+this.template).tmpl( this.item ) )

	move: ( posX, posY ) ->
		this.el.css("left", posX )
		this.el.css("top", posY )

	tap: =>
		if( this.el.attr("data-tapped") == "false" )
			this.el.attr("data-tapped", "true")
		else
			this.el.attr("data-tapped", "false")

	flip: =>
		if( this.el.attr("data-flipped") == "false" )
			this.el.attr("data-flipped", "true")
		else
			this.el.attr("data-flipped", "false")
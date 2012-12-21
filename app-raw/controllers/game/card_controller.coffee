class CardController extends Spine.Controller
	
	template: "CardTemplate"
	constructor: ->
		super
		this.render()

	render: ->
		this.el = ( $("#"+this.template).tmpl( this.item ) )
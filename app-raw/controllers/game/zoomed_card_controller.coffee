class ZoomedCardController extends Spine.Controller
	constructor: ->
		super

	zoomIn: ( card ) =>
		if( card.controller.isFlippedUp )
			this.el.css("background-image", "url('images/cards/"+card.controller.item.img_id+".jpg')")
			console.log( "Zooming In" );

	zoomOut: =>
		this.el.css("background-image", "none")
		console.log( "Zooming In" );
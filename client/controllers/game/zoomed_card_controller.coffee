class @ZoomedCardController extends Spine.Controller
	constructor: ->
		super

	zoomIn: ( cardModel ) =>
		if( cardModel.controller == null || cardModel.controller.isFlippedUp )
			this.el.attr("data-isZooming", "true")
			this.el.css("background-image", "url('"+cardModel.image_url+"')")
			#console.log( "Zooming In" );

	zoomOut: =>
			this.el.attr("data-isZooming", "false")
			this.el.css("background-image", "none")
		#console.log( "Zooming In" );
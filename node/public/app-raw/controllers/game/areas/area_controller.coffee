class AreaController extends Spine.Controller

	player: null
	isTopCardRevealed: false

	constructor: ->
		super

	setItem: ( areaModel ) ->
		this.item = areaModel
		this.el.data().areaId = areaModel.id

	addCard: ( cardModel ) ->
		this.item.addCard( cardModel )

	removeCard: ( cardModel ) ->
		this.item.removeCard( cardModel )
		this.player.zoomCardOut()

	toggleRevealTopCard: ( cardModel ) ->
		if( this.isTopCardRevealed )
			this.el.css("background-image", 'url("../images/back.jpg")')
			this.isTopCardRevealed = false
		else 
			this.el.css("background-image", 'url("'+cardModel.image_url+'")')
			this.isTopCardRevealed = true

	checkCardsEmpty: ->
		if( this.item.isEmpty() )
			this.el.attr("data-isEmpty", true )
		else
			this.el.attr("data-isEmpty", false )

	onCardDrops: ( card ) ->

	onMouseOver: () ->
		if( this.isTopCardRevealed )
			this.player.zoomCardIn( this.item.getTopCard() )

	onMouseOut: () ->
		if( this.isTopCardRevealed )
			this.player.zoomCardOut()
class @AreaController extends Spine.Controller

	player: null
	isTopCardRevealed: false
	topCard: null

	constructor: ->
		super

	setItem: ( areaModel ) ->
		this.item = areaModel
		this.el.data().areaId = areaModel.id

	addCard: ( cardModel ) ->
		this.item.addCard( cardModel )
		this.checkCardsEmpty()

	removeCard: ( cardModel ) ->
		this.item.removeCard( cardModel )
		this.player.zoomCardOut()
		this.checkCardsEmpty()

	toggleRevealTopCard: ( cardModel ) ->
		if( this.isTopCardRevealed )
			this.el.css("background-image", 'url("../images/back.jpg")')
			this.isTopCardRevealed = false
			this.topCard = null
		else 
			this.el.css("background-image", 'url("'+cardModel.image_url+'")')
			this.isTopCardRevealed = true
			this.topCard = cardModel

	checkCardsEmpty: ->
		if( this.item.isEmpty() )
			this.el.attr("data-isEmpty", true )
		else
			this.el.attr("data-isEmpty", false )

	onCardDrops: ( card ) ->

	onDrawCard: () ->
		if( this.isTopCardRevealed )
			this.player.toogleRevealTopCardFromArea( this.item )

	onMouseOver: () ->
		if( this.isTopCardRevealed )
			this.player.zoomCardIn( this.topCard )

	onMouseOut: () ->
		if( this.isTopCardRevealed )
			this.player.zoomCardOut()
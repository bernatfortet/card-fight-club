class AreaController extends Spine.Controller

	player: null

	constructor: ->
		super

	setItem: ( areaModel ) ->
		this.item = areaModel
		this.el.data().areaId = areaModel.id

	addCard: ( card ) ->
		this.item.addCard( card )

	removeCard: ( card ) ->
		this.item.removeCard( card )

	checkCardsEmpty: ->
		if( this.item.isEmpty() )
			this.el.attr("data-isEmpty", true )
		else
			this.el.attr("data-isEmpty", false )

	onCardDrops: ( card ) ->
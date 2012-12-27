class CardListerController extends Spine.Controller

	template:
		'<li>${card.name}<li>'

	currentList: null
	selectedItem: null
	currentArea: null
	currentDeckId: null

	constructor: ->
		super

		this.el.find(".Close").on("click", this.closeLister )
		this.el.on("click", "li", this.onClickItem )
		this.el.find(".MoveToTop").on("click", this.moveCardToTop )
		this.el.find(".MoveUp").on("click", this.moveCardUp )
		this.el.find(".MoveDown").on("click", this.moveCardDown )
		this.el.find(".MoveToBottom").on("click", this.moveCardToBottom )

	onClickItem: (event) =>
		this.cleanSelectedItem()
		clickedItem = $(event.currentTarget)
		this.selectedItem = clickedItem
		clickedItem.attr("data-state", "selected")

	cleanSelectedItem: ->
		this.el.find("li[data-state='selected']").attr("data-state", "")

	closeLister: =>
		this.el.find(".List").html("")
		this.el.attr("data-state","hidden")

	showCardsFromArea: ( area ) ->
		this.closeLister()
		this.cleanSelectedItem()
		cards = area.getCardsModels()
		this.renderCards( cards )
		this.currentArea = area
		this.currentList = cards
		this.el.attr("data-state","visible")

	renderCards: ( cards ) ->
		this.renderCard( cards[objectIndex] ) for objectIndex of cards

	renderCard: ( card ) ->
		this.el.find(".List").append( "<li>#{card.name}</li>" )

	refresh: ->
		this.showCardsFromArea( this.currentArea )

	moveCardUp: =>
		this.currentArea.moveCardUp( this.selectedItem.index() )
		this.refresh()

	moveCardDown: =>
		this.currentArea.moveCardDown( this.selectedItem.index() )
		this.refresh()

	moveCardToTop: =>
		this.currentArea.moveCardToTop( this.selectedItem.index() )
		this.refresh()

	moveCardToBottom: =>
		this.currentArea.moveCardToBottom( this.selectedItem.index() )
		this.refresh()


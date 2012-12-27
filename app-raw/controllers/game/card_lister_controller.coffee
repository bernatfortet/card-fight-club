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


	onClickItem: (event) =>
		this.el.find("li[data-state='selected']").attr("data-state", "")
		clickedItem = $(event.currentTarget)
		this.selectedItem = clickedItem
		clickedItem.attr("data-state", "selected")

	closeLister: =>
		this.el.find(".List").html("")
		this.el.attr("data-state","hidden")


	showDeckCards: ( deckId ) ->
		this.showCardsFromArea( deckId, "deck")

	showCardsFromArea: ( deckId, area ) ->
		this.closeLister()
		cards = Deck.find( deckId ).getCardsModelListFromArea( area )
		this.renderCards( cards )
		this.currentArea = area
		this.currentDeckId = deckId
		this.currentList = cards
		this.el.attr("data-state","visible")

	renderCards: ( cards ) ->
		this.renderCard( cards[objectIndex] ) for objectIndex of cards

	renderCard: ( card ) ->
		this.el.find(".List").append( "<li>#{card.name}</li>" )

	refresh: ->
		this.showCardsFromArea( this.currentDeckId, this.currentArea )

	moveCardUp: ->
		itemIndex = selectedItem.index()
		newIndex = itemIndex-1
		Deck.find( this.currentDeckId ).moveItemInArea( itemIndex, newIndex, area )
		this.refresh()

	moveCardDown: ->
		itemIndex = selectedItem.index()
		newIndex = itemIndex+1
		Deck.find( this.currentDeckId ).moveItemInArea( itemIndex, newIndex, area )
		this.refresh()

	moveCardToTop: ->
		itemIndex = selectedItem.index()
		newIndex = 0
		Deck.find( this.currentDeckId ).moveItemInArea( itemIndex, newIndex, area )
		this.refresh()

	moveCardBottom: ->
		itemIndex = selectedItem.index()
		newIndex = -1
		Deck.find( this.currentDeckId ).moveItemInArea( itemIndex, newIndex, area )
		this.refresh()


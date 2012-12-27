class DeckController extends Spine.Controller
	constructor: ->
		super

	addCardToArea: ( card, targetArea ) ->
		switch targetArea
			when "deck"
				this.item.addCardToArea( card, targetArea )
				this.checkDeckCards()
			when "hand"
				this.item.addCardToArea( card, targetArea )
			when "board"
				this.item.addCardToArea( card, targetArea )
			when "graveyard"
				this.item.addCardToArea( card, targetArea )

	removeCardFromArea: ( card, area ) ->
		switch area
			when "deck"
				this.item.removeCardFromArea( card, area )
				this.checkDeckCards()
			when "hand"
				this.item.removeCardFromArea( card, area )
			when "board"
				this.item.removeCardFromArea( card, area )
			when "graveyard"
				this.item.removeCardFromArea( card, area )


	checkDeckCards: ->
		if( this.item.isDeckEmpty() )
			this.el.attr("data-isEmpty", true )
		else
			this.el.attr("data-isEmpty", false )
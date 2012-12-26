class Card extends Spine.Model
	@configure 'Card', 'id', 'card_id', "img", "deck", "area", "controller"

	@include
		setArea: ( targetArea ) ->
			this.deck.removeCardFromArea( this, this.area )
			this.area = targetArea
			this.deck.addCardToArea( this, targetArea )
			this.save()

		setController: ( cardController ) ->
			this.controller = cardController
			this.save()

		canBeTapped: ->
			this.isOnBoard

		isOnBoard: ->
			this.area == "board"

		isOnDeck: ->
			this.area == "deck"

		isOnHand: ->
			this.area == "hand"

		isOnGraveyard: ->
			this.area == "graveyard"
class Card extends Spine.Model
	@configure 'Card', 'id', "img_id", "deck_id", "area", "controller"

	@include
		setArea: ( area ) ->
			this.area = area
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
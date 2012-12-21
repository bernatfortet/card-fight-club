class Card extends Spine.Model
	@configure 'Card', 'id', "img_id", "deck_id", "area"

	@include
		canBeTapped: ->
			this.isOnBoard

		isOnBoard: ->
			this.area == "onBoard"

		isOnDeck: ->
			this.area == "onDeck"

		isOnGraveyard: ->
			this.area == "onGraveyard"
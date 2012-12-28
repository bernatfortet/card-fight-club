class Card extends Spine.Model
	@configure 'Card', 'id', 'card_id', "image_url", "name", "deckId", "areaId", "controller"

	@include
		setArea: ( areaId ) ->
			Area.find( this.areaId ).controller.removeCard( this )
			this.areaId = areaId
			Area.find( this.areaId ).controller.addCard( this )
			this.save()

		setController: ( cardController ) ->
			this.controller = cardController
			this.save()
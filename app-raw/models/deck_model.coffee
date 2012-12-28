class Deck extends Spine.Model
	@configure 'Deck', 'id', 'name', 'baseCards', 'controller'

	@include
		createCard: ( cardId ) ->
			realCardModel = UserCard.find( cardId )
			cardModel = Card.create( card_id: realCardModel.id, image_url: realCardModel.data.image_url, name: realCardModel.data.name, deck: this, areaId: this.controller.item.id, controller: null  )
			this.controller.addCard( cardModel )

Deck.bind "create", ( deck ) ->
	deck.createCard( deck.baseCards[cardIndex] ) for cardIndex of deck.baseCards

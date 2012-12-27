class Deck extends Spine.Model
	@configure 'Deck', 'id', 'name', 'baseCards', 'controller'

	@include
		createCard: ( cardJSON ) ->
			cardModel = Card.create( card_id: cardJSON.card_id, img: cardJSON.img, name: cardJSON.name, deck: this, areaId: this.controller.item.id, controller: null  )
			this.controller.addCard( cardModel )

Deck.bind "create", ( deck ) ->
	deck.createCard( deck.baseCards[cardIndex] ) for cardIndex of deck.baseCards

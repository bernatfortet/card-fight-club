class @Deck extends Spine.Model
	@configure 'Deck', 'id', 'name', 'cards', 'controller'

	@include
		createCard: ( realCardId, image_url, name ) ->
			cardModel = Card.create( card_id: realCardId, image_url: image_url, name: name, deckId: this.id, areaId: this.controller.item.id, previousAreaId:this.controller.item.id, controller: null  )
			this.controller.addCard( cardModel )

		createOponentCard: ( cardId, image_url, name )->
			cardModel = Card.create( id: cardId, image_url: image_url, name: name, deckId: this.id, areaId: this.controller.item.id, previousAreaId:this.controller.item.id,  controller: null  )
			this.controller.addCard( cardModel )
			
Deck.bind "create", ( deck ) ->
	if( typeof( deck.cards[0] ) == "string" )
		for cardIndex of deck.cards
			cardId = deck.cards[cardIndex]
			realCardModel = UserCard.find( cardId )
			deck.createCard( realCardModel.id, realCardModel.image_url, realCardModel.name  )
	else
		for cardIndex of deck.cards
			card = deck.cards[cardIndex]
			deck.createOponentCard( card.id, card.image_url, card.name  )
class Deck extends Spine.Model
	@configure 'Deck', 'id', 'name', 'baseCards', 'cardsOnDeck', 'cardsOnHand', 'cardOnBoard', 'cardOnGraveyard', 'controller'

	@include
		getTopCard: -> 
			if( !this.cardsOnDeck.isEmpty() )
				topCard = this.cardsOnDeck.list[0]
				this.cardsOnDeck.Remove( topCard )
				return Card.find( topCard )

		setController: ( deckController ) ->
			this.controller = deckController
			this.save()

		isDeckEmpty: ->
			return this.cardsOnDeck.Count() <= 0

		shuffle: ->
			console.log("Shuffling Deck", this.id);
			this.shuffleWithModernFisherYates()

		shuffleWithModernFisherYates : ->
			length = this.cardsOnDeck.Count()
			array = this.cardsOnDeck.list
			i = length;
			while (--i)
				j = Rand() * (i + 1) | 0
				swap = array[i]
				array[i] = array[j]
				array[j] = swap;

		addCardToArea: (card, area ) ->
			switch area
				when "deck"
					this.cardsOnDeck.Add( card.id )
					if( card.controller != null)
						card.controller.el.remove()
						card.controller = null
				when "hand"
					this.cardsOnHand.Add( card.id )
				when "board"
					this.cardOnBoard.Add( card.id )
				when "graveyard"
					this.cardOnGraveyard.Add( card.id )

		removeCardFromArea: ( card, area ) ->
			switch area
				when "deck"
					this.cardsOnDeck.Remove( card.id )
				when "hand"
					this.cardsOnHand.Remove( card.id )
				when "board"
					this.cardOnBoard.Remove( card.id )
				when "graveyard"
					this.cardOnGraveyard.Remove( card.id )

		moveItemFromArea: ( itemIndex, newIndex, area ) ->
			switch area
				when "deck"
					this.cardsOnDeck.Move( itemIndex, newIndex )
				when "hand"
					this.cardsOnHand.Move( itemIndex, newIndex )
				when "board"
					this.cardOnBoard.Move( itemIndex, newIndex )
				when "graveyard"
					this.cardOnGraveyard.Move( itemIndex, newIndex )


		getCardsModelListFromArea: ( area ) ->
			object = new Object()
			iCounter = 0

			Card.each ( card ) =>
				if( card.deck.id == this.id && card.area == area )
					object[iCounter] = card
					iCounter++

			return object


		createCard: ( cardJSON ) ->
			cardModel = Card.create( card_id: cardJSON.card_id, img: cardJSON.img, name: cardJSON.name, deck: this, area: "deck", controller: null  )
			this.controller.addCardToArea( cardModel, cardModel.area )

Deck.bind "create", ( deck ) ->
	deck.controller.item = deck
	deck.cardsOnDeck = new List()
	deck.cardsOnHand = new List()
	deck.cardOnBoard = new List()
	deck.cardOnGraveyard = new List()

	deck.createCard( deck.baseCards[cardIndex] ) for cardIndex of deck.baseCards
	deck.shuffle()
	deck.save()


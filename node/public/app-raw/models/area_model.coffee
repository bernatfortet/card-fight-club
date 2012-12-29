class Area extends Spine.Model
	@configure 'Area', "name", 'cards', 'controller'

	@include
		setController: ( controller ) ->
			this.controller = controller
			this.save()

		setList: () ->
			this.cards = new List()
			this.save()

		getTopCard: -> 
			if( !this.cards.isEmpty() )
				topCard = this.cards.list[0]
				this.cards.Remove( topCard )
				return Card.find( topCard )

		isEmpty: ->
			return this.cards.Count() <= 0

		shuffle: ->
			this.shuffleWithModernFisherYates()

		shuffleWithModernFisherYates : ->
			length = this.cards.Count()
			array = this.cards.list
			i = length;
			while (--i)
				j = Rand() * (i + 1) | 0
				swap = array[i]
				array[i] = array[j]
				array[j] = swap;

		addCard: ( cardModel ) ->
			this.cards.Insert( 0, cardModel.id )

		removeCard: ( cardModel ) ->
			this.cards.Remove( cardModel.id )

		moveCardUp: ( itemIndex ) ->
			newIndex = itemIndex-1
			this.moveCard( itemIndex, newIndex )

		moveCardDown: ( itemIndex ) ->
			newIndex = itemIndex+1
			this.moveCard( itemIndex, newIndex )

		moveCardToTop: ( itemIndex ) ->
			newIndex = 0
			this.moveCard( itemIndex, newIndex )

		moveCardToBottom: ( itemIndex ) ->
			newIndex = this.cards.Count()-1
			this.moveCard( itemIndex, newIndex )

		moveCard: ( itemIndex, newIndex ) ->
			this.cards.Move( itemIndex, newIndex )
			this.save()

		getCardsModels: () ->
			object = new Object()
			iCounter = 0

			for cardId in this.cards.list
				object[iCounter] = Card.find( cardId )
				iCounter++

			return object

Area.bind "create", ( area ) ->
	area.cards = new List()

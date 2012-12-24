class Deck extends Spine.Model
	@configure 'Deck', 'name', 'baseCards', 'cards'

	putCardOnTop: ( card ) ->


	getTopCard: ->
		if( !this.cards.isEmpty() )
			card = this.cards.Get(0)
			this.cards.Remove(0)
			return card

	hasCards: ->
		!this.cards.isEmpty()

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

Deck.bind "create", ( deck ) ->
	cardsList = new List()
	cardsList.Add(card) for card in deck.baseCards
	deck.cards = cardsList

	deck.shuffle()
	deck.shuffle()
	deck.shuffle()
	deck.save()


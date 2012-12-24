class Deck extends Spine.Model
	@configure 'Deck', 'name', 'baseCards', 'cards'

	getTopCard: ->
		if( !this.cards.isEmpty() )
			return this.cards.Dequeue()

	hasCards: ->
		!this.cards.isEmpty()

	shuffle: ->
		this.shuffleCurrentCardsModernFisherYates() # for x in [1..10]

	shuffleCurrentCardsModernFisherYates : ->
		length = this.cards.Count()
		array = this.cards.GetQueue()
		i = length;
		while (--i)
			j = Rand() * (i + 1) | 0
			swap = array[i]
			array[i] = array[j]
			array[j] = swap;

Deck.bind "create", ( deck ) ->
	q = new Queue()
	q.Enqueue(card) for card in deck.baseCards
	deck.cards = q


	deck.shuffle()
	deck.shuffle()
	deck.shuffle()
	deck.save()


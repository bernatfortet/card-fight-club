class Deck extends Spine.Model
	@configure 'Deck', 'name', 'baseCards', 'currentCards'

	getTopCard: ->
		if( !this.currentCards.isEmpty() )
			return this.currentCards.Dequeue()

	hasCards: ->
		!this.currentCards.isEmpty()

	shuffle: ->
		this.shuffleCurrentCardsModernFisherYates() # for x in [1..10]

	shuffleCurrentCardsModernFisherYates : ->
		length = this.currentCards.Count()
		array = this.currentCards.GetQueue()
		i = length;
		while (--i)
			j = Rand() * (i + 1) | 0
			swap = array[i]
			array[i] = array[j]
			array[j] = swap;

Deck.bind "create", ( deck ) ->
	q = new Queue()
	q.Enqueue(card) for card in deck.baseCards
	deck.currentCards = q


	deck.shuffle()
	deck.save()


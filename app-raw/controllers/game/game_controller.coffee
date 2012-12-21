class GameController extends Spine.Controller
	constructor: ->
		super

		this.playerDeck = Deck.create( 
			name: "Deck Player", 
			baseCards: [ 1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,6,6,7,7,7,7,8,8,8,8,8,8,8
			,8,9,9,9,9,10, 10,10,10,12,12,12,12,13,13,13,13]
		)

		this.opponentDeck = Deck.create( 
			name: "Deck Opponent", 
			baseCards: [ 1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,6,6,7,7,7,7,8,8,8,8,8,8,8
			,8,9,9,9,9,10, 10,10,10,12,12,12,12,13,13,13,13]
		)


		this.player = new PlayerController({ el: $(".Player"), deck: this.playerDeck})
		this.opponent = new PlayerController({ el: $(".Opponent"), deck: this.opponentDeck})

		this.player.setDeck( this.playerDeck )
		this.opponent.setDeck( this.opponentDeck )
		
		this.inputController = new InputController()
class GameController extends Spine.Controller

	areas:
		deck: "deck"
		hand: "hand"
		board: "board"
		graveyard: "graveyard"


	constructor: ->
		super


	initialize: ->

		this.humanInputController = new HumanInputController()
		this.networkInputController = new NetworkInputController()

		this.setPlayers()
		this.setInputControllers()

		this.zoomedCardController = new ZoomedCardController({ el: $(".ZoomedCard")})

	setPlayers: ->
		playerInfo = this.getPlayerInfo()
		this.player = new PlayerController({ el: $(".Player")})
		this.player.setDeck( playerInfo.player.deck )

	setInputControllers: ->

		this.humanInputController.setTargetPlayer( this.player )
		this.networkInputController.setTargetPlayer( this.opponent )

	getPlayerInfo: ->
		player:
			name: "Socra"
			deck:
				deck_id: 1
				name: "deck1"
				cardList:
					0: 
						card_id: 1
						img: "1.jpg"
						name: "name1"
					1: 
						card_id: 2
						img: "2.jpg"
						name: "name2"
					2: 
						card_id: 3
						img: "3.jpg"
						name: "name3"



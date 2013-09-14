Meteor.subscribe( 'users' )
Meteor.subscribe( 'userStatus' )
Meteor.subscribe( 'matches' )
Meteor.subscribe( 'decks' )

@cards = new Meteor.Collection('cards')

Template.users_list.users = ->
	#console.log Meteor.users.find().fetch()
	Meteor.users.find()



Meteor.startup( ->
	matchesController = new MatchesController()
	currentUserController = new CurrentUserController()
	loginController = new LoginController()
	challengController = new ChallengeController()

	if( Meteor.user() )
		Session.set('section', 'SectionMain')

		api.app = new App( el: $("body") )
		api.app.initialize()
)


class App extends Spine.Controller
	userInfo: null


	constructor: ->
		super

	initialize: ->
		this.setupCards()
		#this.gameController = new GameController()
		#this.startGame()
		#this.dbController = new DBController()
		#this.networkController = new NetworkController()




		#this.dbController.getDeckFromMongoLab( this.getDeckid() )

	createUser: ( userData, deckData  ) ->
		randomId = Math.floor( Math.random() * 1000 )
		User.create({ id: randomId,  name: "User"+randomId, deck: deckData })
		this.networkController.onReady()

	startGame: ->
		#this.gameController.initialize()


	setupCards: ->
		userDeck = Decks.findOne( Meteor.user().profile.current_deck_id )
		console.log 'userDeck', userDeck

		for index of userDeck.cards
			cardId = userDeck.cards[index]
			this.getCardFromTutor( cardId, this.onLoadCard, cardId )
			this.cardsToLoad = index

		this.finishLoadinUserInfo( userDeck )

	getCardFromTutor: ( cardId ) ->
		$.ajax({
			url: this.tutorServerUrl + cardId,
			type: "GET",
			dataType: "json",
			success: ( JSON ) => 
				this.onLoadCard( JSON, cardId )
		})

	finishLoadinUserInfo: ( mongolabDeckData ) ->
		console.log( this.cardsToLoad, this.cardsToLoad <= 0 );
		if( this.cardsToLoad <= 0 )
			console.log( "finished ");
			app.createUser( "pepito", mongolabDeckData )

	cardsToLoad: 0

	onLoadCard: ( tutorCardData, cardId ) ->
		this.cardsToLoad--
		card = UserCard.create({
			id: cardId,
			name: tutorCardData.name,
			image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=#{cardId}&type=card",
			type: tutorCardData.type
		})
		console.log( card );
		this.finishLoadinUserInfo( this.mongolabDeckData )


@api = {}

serverIp = window.location.hostname
localServer = true
debugApp = true


isOnInternet = window.location.hostname != "localhost"

if( isOnInternet )
	localServer = false
	debugApp = false


###
if( !localServer && !debugApp )
	window.onbeforeunload: -> 
		if ( true )
			return "Are you sure you want to exit this page?"
###
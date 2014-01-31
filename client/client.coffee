@api = {}

@serverIp = window.location.hostname
@localServer = false
@debugApp = true


@isOnInternet = window.location.hostname != "localhost"

if( isOnInternet )
	localServer = false
	debugApp = false


###
if( !localServer && !debugApp )
	window.onbeforeunload: -> 
		if ( true )
			return "Are you sure you want to exit this page?"
###

Meteor.subscribe( 'users' )
Meteor.subscribe( 'userStatus' )
Meteor.subscribe( 'matches' )
Meteor.subscribe( 'decks', ->

	if( Meteor.user() )
		app.initialize()
)

@cards = new Meteor.Collection('cards')

Template.users_list.users = ->
	#console.log Meteor.users.find().fetch()
	Meteor.users.find()



Meteor.startup( =>
	matchesController = new MatchesController()
	currentUserController = new CurrentUserController()
	loginController = new LoginController()
	challengController = new ChallengeController()

	if( Meteor.user() )
		@app = new App( el: $("#App") )

		
)


class App extends Spine.Controller
	userInfo: null


	constructor: ->
		super
		api.app = this

	initialize: ->
		this.gameController = new GameController()

	startGame: ->
		this.setState( 'SectionMatch' )
		this.gameController.initialize()

	setState: ( newState ) ->
		this.el.attr('section', newState ) 

	# Deck Setup ==========================

	cardsToLoad: 0
	tutorServerUrl: "http://"+window.location.hostname+":3000/api/v1/cards/"

	prepareGame: ->
		this.setState( 'SectionWaitingOpponent' )
		this.setupCards()

	setupCards: ->
		userDeck = Decks.findOne( Meteor.user().profile.current_deck_id )
		console.log 'userDeck', userDeck

		for index of userDeck.cards
			console.log 'asdfadsf'
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
		console.log( this.cardsToLoad, this.cardsToLoad == 0 );
		if( this.cardsToLoad == 0 )
			console.log( "finished ");
			app.startGame()


	onLoadCard: ( tutorCardData, cardId ) ->
		card = UserCard.create({
			id: cardId,
			name: tutorCardData.name,
			image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=#{cardId}&type=card",
			type: tutorCardData.type
		})
		this.finishLoadinUserInfo( this.mongolabDeckData )
		this.cardsToLoad--
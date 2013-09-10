Meteor.subscribe( 'users' )
Meteor.subscribe( 'userStatus' )
Meteor.subscribe( 'matches' )


Template.users_list.users = ->
	#console.log Meteor.users.find().fetch()
	Meteor.users.find()



Meteor.startup( ->
	matchesController = new MatchesController()
	currentUserController = new CurrentUserController()
	loginController = new LoginController()
	challengController = new ChallengeController()

	app = new App( el: $("body") )
	app.initialize()
)


class App extends Spine.Controller
	userInfo: null


	constructor: ->
		super

	initialize: ->
		console.log DBController
		this.gameController = new GameController()
		this.startGame()
		#this.dbController = new DBController()
		#this.networkController = new NetworkController()

		#this.dbController.getDeckFromMongoLab( this.getDeckid() )

	createUser: ( userData, deckData  ) ->
		randomId = Math.floor( Math.random() * 1000 )
		User.create({ id: randomId,  name: "User"+randomId, deck: deckData })
		this.networkController.onReady()

	startGame: ->
		this.gameController.initialize()

	getDeckid: ->
		if( !debugApp )
			deckId = prompt("Insert Deck Id","");

		if( deckId == "1")
			deckId = "50df4fe8e4b0d84e5fee60ad" #RedRage
		else if( deckId == "2" )
			deckId = "50dcf268e4b0b7b39972bf5f" #FirstDeck
		else if( deckId == "3" )
			deckId = "50df5072e4b0d84e5fee60b0" #Fragmentados
		else if( deckId == "4" )
			deckId = "50f732cde4b09c5e82a843b0" #Dragon Control
		else if( deckId == "5" )
			deckId = "50f732efe4b09c5e82a843b2" #Kingh Sleight
		else 
			deckId = "50df4fe8e4b0d84e5fee60ad" #RedRage



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


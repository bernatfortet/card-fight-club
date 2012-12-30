class DBController extends Spine.Controller

	#MongoDB
	baseMongoLabDBUrl: "https://api.mongolab.com/api/1/databases/card-fight-club/collections/"
	apiKey: "apiKey=50b9ed0fe4b0afba6ecc5836"

	#Tutor Server
	tutorServerUrl: "http://"+serverIp+":3000/card/"

	deckId: "50dcf268e4b0b7b39972bf5f"
	userId: "50dcf675e4b0876155f7f7c8"

	userInfo: null

	mongolabDeckData: null

	cardsToLoad: 0

	constructor: ->
		super

	getDeckFromMongoLab: ( deckId ) ->
		UserCard.fetch =>
			this.getDeck( deckId, this.buildDeckInfo )
		UserCard.fetch()

	buildDeckInfo: ( mongolabDeckData ) =>
		this.mongolabDeckData = mongolabDeckData

		for index of mongolabDeckData.cards
			cardId = mongolabDeckData.cards[index]
			if( !UserCard.exists( cardId ) )
				this.getCardFromTutor( cardId, this.onLoadCard, cardId )
				this.cardsToLoad = index


		this.finishLoadinUserInfo( this.mongolabDeckData )

	onLoadCard: ( tutorCardData, cardId ) ->
		this.cardsToLoad--
		card = UserCard.create({
			id: cardId,
			name: tutorCardData.name,
			image_url: tutorCardData.image_url,
			type: tutorCardData.type
		})
		console.log( card );
		this.finishLoadinUserInfo( this.mongolabDeckData )

	finishLoadinUserInfo: ( mongolabDeckData ) ->
		console.log( this.cardsToLoad, this.cardsToLoad <= 0 );
		if( this.cardsToLoad <= 0 )
			console.log( "finished ");
			app.createUser( "pepito", mongolabDeckData )

	getUser: ( userId, callback ) ->
		collection = "users/"+userId
		this.getData(collection, (JSON) =>
			this.userInfo = JSON
			this.getDeck( JSON.decks[0], callback )
		)

	getDeck: ( deckId, callback ) ->
		collection = "decks/"+deckId
		this.getData(collection, (JSON) => 
			if( callback )
				callback ( JSON )
		)

	getCardFromTutor: ( cardId ) ->
		$.ajax({
			url: this.tutorServerUrl + cardId,
			type: "GET",
			dataType: "jsonp",
			success: ( JSON ) => 
				this.onLoadCard( JSON, cardId )
		})

	getData: ( collection, callback ) ->
		$.ajax({
			url: this.baseMongoLabDBUrl + collection + "?" +  this.apiKey
			type: "GET",
			dataType: "json"
			success: callback
		});

	setData: ( collection, callback ) ->
		$.ajax({
			url: this.baseMongoLabDBUrl + collection + "?" +  this.apiKey
			data: JSON.stringify( { "x" : 1 } )
			type: "POST",
			contentType: "application/json"
			success: callback
		})
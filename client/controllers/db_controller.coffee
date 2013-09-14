class @DBController extends Spine.Controller

	#Tutor Server
	tutorServerUrl: "http://"+window.location.hostname+":3000/api/v1/cards/"

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
			image_url: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=#{cardId}&type=card",
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
			dataType: "json",
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
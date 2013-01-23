var Multiplayer = {
	io: null,

	init: function( io ){
		console.log("Initializing Multiplayer");
		
		this.io = io;
		this.setListeners( );
	},

	setListeners: function( ){
		var _this = this;

		this.io.sockets.on('connection', function ( user ) {
			console.log("on Connection -->>>>>>>>>>>>>>>>>>>>>");

			user.on('onConnect', function( data ) {
				console.log( "onConnect");
				var roomId = data.roomId

				user.set('roomId', roomId )
				user.set('userId', data.userId )
				user.join( roomId )

				var clientsInRoom = _this.io.sockets.clients( roomId ).length
				if( clientsInRoom >= 2 )
					_this.io.sockets.in(roomId).emit( "onUserJoinsRoom", "TODO fill user Data" )
			});

			//Deck
			user.on('onCreateDeck', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onDeckIsCreated ");
					user.broadcast.to(roomId).emit( "onDeckIsCreated", data );
				});
			});

			//Cards
			user.on('onCreateCard', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCardIsCreated ");
					user.broadcast.to(roomId).emit( "onCardIsCreated", data );
				});
			});
			user.on('onRemoveCard', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCardIsRemoved ");
					user.broadcast.to(roomId).emit( "onCardIsRemoved", data );
				});
			});
			user.on('onMoveCard', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCardIsMoved ");
					user.broadcast.to(roomId).emit( "onCardIsMoved", data );
				});
			});
			user.on('onTapCard', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCardIsTapped ");
					user.broadcast.to(roomId).emit( "onCardIsTapped", data );
				});
			});
			user.on('onUntapCard', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCardIsUntapped ");
					user.broadcast.to(roomId).emit( "onCardIsUntapped", data );
				});
			});
			user.on('onFlipCardUp', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCardIsFlippedUp ");
					user.broadcast.to(roomId).emit( "onCardIsFlippedUp", data );
				});
			});
			user.on('onFlipCardDown', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCardIsFlippedDown ");
					user.broadcast.to(roomId).emit( "onCardIsFlippedDown", data );
				});
			});
			user.on('onCardChangesArea', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCardAreaIsChanged ");
					user.broadcast.to(roomId).emit( "onCardAreaIsChanged", data );
				});
			});
			user.on('onToggleRevealCardFromArea', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCardFromAreaIsRevealedToggle ");
					user.broadcast.to(roomId).emit( "onCardFromAreaIsRevealedToggle", data );
				});
			});

			//Chatt
			user.on('onSendChatMsg', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onChatMsgIsReceived ");
					user.broadcast.to(roomId).emit( "onChatMsgIsReceived", data );
				});
			});

			//Gameplay
			user.on('onPassTurn', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onTurnIsReceived ");
					user.broadcast.to(roomId).emit( "onTurnIsReceived", data );
				});
			});
			user.on('onThrowDice', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onDiceIsThrown ");
					user.broadcast.to(roomId).emit( "onDiceIsThrown", data );
				});
			});

			//Counter
			user.on('onCreateCounter', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCounterIsCreated ");
					user.broadcast.to(roomId).emit( "onCounterIsCreated", data );
				});
			});
			user.on('onRemoveCounter', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCounterIsRemoved ");
					user.broadcast.to(roomId).emit( "onCounterIsRemoved", data );
				});
			});
			user.on('onMoveCounter', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCounterIsMoved ");
					user.broadcast.to(roomId).emit( "onCounterIsMoved", data );
				});
			});
			user.on('onSetCounter', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCounterIsSet ");
					user.broadcast.to(roomId).emit( "onCounterIsSet", data );
				});
			});
			user.on('onAttachCounterToCard', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCounterIsAttachedToCard ");
					user.broadcast.to(roomId).emit( "onCounterIsAttachedToCard", data );
				});
			});
			user.on('onUnattachCounter', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onCounterIsUnattached ");
					user.broadcast.to(roomId).emit( "onCounterIsUnattached", data );
				});
			});

		});

	},

}
module.exports = Multiplayer;

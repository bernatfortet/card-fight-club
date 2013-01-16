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

			user.on('onCreateDeck', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onDeckIsCreated ");
					user.broadcast.to(roomId).emit( "onDeckIsCreated", data );
				});
			});
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
					user.broadcast.to(roomId).emit( "onCardIsFlippedDown", data );
					console.log( "onCardIsFlippedDown ");
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
			user.on('onSendChatMsg', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onReceiveChatMsg ");
					user.broadcast.to(roomId).emit( "onChatMsgIsReceived", data );
				});
			});
			user.on('onPassTurn', function( data ) {
				user.get('roomId', function(err, roomId){
					console.log( "onPassTurn ");
					user.broadcast.to(roomId).emit( "onTurnIsReceived", data );
				});
			});

		});

	},

}
module.exports = Multiplayer;

var Multiplayer = {
	io: null,

	init: function( io ){
		console.log("Initializing Multiplayer");
		
		this.io = io;
		this.setListeners( );
	},

	setListeners: function( ){
		var _this = this;

		this.io.sockets.on('connection', function ( client ) {

			//client.join('testRoom');

			//_this.io.sockets.in('testRoom').emit("test");
			
			client.on('onCreateDeck', function( data ) {
				client.broadcast.emit( "onDeckIsCreated", data );
				console.log( "onDeckIsCreated ");
			});
			client.on('onCreateCard', function( data ) {
				client.broadcast.emit( "onCardIsCreated", data );
				console.log( "onCardIsCreated ");
			});
			client.on('onRemoveCard', function( data ) {
				client.broadcast.emit( "onCardIsRemoved", data );
				console.log( "onCardIsRemoved ");
			});
			client.on('onMoveCard', function( data ) {
				client.broadcast.emit( "onCardIsMoved", data );
				console.log( "onCardIsMoved ");
			});
			client.on('onTapCard', function( data ) {
				client.broadcast.emit( "onCardIsTapped", data );
				console.log( "onCardIsTapped ");
			});
			client.on('onFlipCardUp', function( data ) {
				client.broadcast.emit( "onCardIsFlippedUp", data );
				console.log( "onCardIsFlippedUp ");
			});
			client.on('onFlipCardDown', function( data ) {
				client.broadcast.emit( "onCardIsFlippedDown", data );
				console.log( "onCardIsFlippedDown ");
			});
			client.on('onCardChangesArea', function( data ) {
				client.broadcast.emit( "onCardAreaIsChanged", data );
				console.log( "onCardAreaIsChanged ");
			});
			client.on('onToggleRevealCardFromArea', function( data ) {
				client.broadcast.emit( "onCardFromAreaIsRevealedToggle", data );
				console.log( "onCardFromAreaIsRevealedToggle ");
			});

		});

	},

}
module.exports = Multiplayer;

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
			
			client.on('onCreateCard', function( data ) {
				client.broadcast.emit( "onCardIsCreated", data );
				console.log( "onCardIsCreated ");
			});
			
			client.on('onCreateDeck', function( data ) {
				client.broadcast.emit( "onDeckIsCreated", data );
				console.log( "onDeckIsCreated ");
			});

		});

	},

}
module.exports = Multiplayer;

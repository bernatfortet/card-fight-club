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

			client.join('testRoom');

			_this.io.sockets.in('testRoom').emit("test");
			
			client.on('onMoveCard', function( data ) {
				client.broadcast.emit( "onMoveCard", data );
				console.log( "moving a Card ");
			});

		});

	},

}
module.exports = Multiplayer;

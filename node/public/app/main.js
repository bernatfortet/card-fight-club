// Required Libs, Controllers and Models ==================================
var appManager;
var serverIp = window.location.hostname;
var localServer = true;

if( !localServer ){
	window.onbeforeunload = function(){
		if ( true ){
			return "Are you sure you want to exit this page?";
		}
	}
}

require(
	[
		"order!jquery",
		
		//Libs =============================
			//Spine Libs
			"order!libs/spine/spine",
			"order!libs/spine/modules/ajax",
			"order!libs/spine/modules/local",
			"order!libs/spine/modules/manager",

			"order!libs/json2",
			"order!libs/debug",

			//Tools
			"order!libs/tools/List",
			"order!libs/tools/queue",
			"order!libs/tools/random/rand_alea",
			"order!libs/tools/random/rand_mash",
			"order!libs/tools/random/rand_generator",

			//Jquery Libs
			"order!libs/jquery/jquery-ui.min",
			"order!libs/jquery/plugins/jquery.easing.1.3",
			"order!libs/jquery/plugins/jquery.tmpl",
			"order!libs/jquery/plugins/jquery.contextMenu",
			"order!libs/jquery/plugins/jwerty",

			
		//Controllers ==========================
			
			"order!controllers/app",
			"order!controllers/db_controller",
			"order!controllers/network_controller",

			"order!controllers/game/game_controller",
			"order!controllers/game/player_controller",
			"order!controllers/game/multiplayer_controller",
			"order!controllers/game/card_controller",
			"order!controllers/game/zoomed_card_controller",
			"order!controllers/game/card_lister_controller",

			//Areas
			"order!controllers/game/areas/area_controller",
			"order!controllers/game/areas/deck_controller",
			"order!controllers/game/areas/hand_controller",
			"order!controllers/game/areas/board_controller",
			"order!controllers/game/areas/graveyard_controller",
			"order!controllers/game/areas/sideboard_controller",
			
			//Inputs
			"order!controllers/game/inputs/input_controller",
			"order!controllers/game/inputs/human_input_controller",
			"order!controllers/game/inputs/network_input_controller",

		//Models ==========================
			"order!models/user_model",
			"order!models/user_card_model",

			//GAME
			"order!models/card_model",
			"order!models/deck_model",
			"order!models/area_model",


	],
	function( require ) {

		var spine = require('libs/spine/spine')
		log("----------------------------------------------Initilizing App ----------------------" );

		$(document).ready(function(){
			app = new App({ el: $("body")});
			app.initialize();
		});
    }
);

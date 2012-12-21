// Required Libs, Controllers and Models ==================================
var appManager;

require(
	[
		"order!jquery",
		
		//Libs =============================
			//Spine Libs
			"order!libs/spine/spine",
			"order!libs/spine/modules/ajax",
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
			"order!libs/jquery/plugins/jwerty",

			
		//Controllers ==========================
			
			"order!controllers/app",
			"order!controllers/game/game_controller",
			"order!controllers/game/player_controller",
			"order!controllers/game/card_controller",
			
			//Inputs
			"order!controllers/game/inputs/input_controller",
			"order!controllers/game/inputs/human_input_controller",
			"order!controllers/game/inputs/network_input_controller",

		//Models ==========================
			"order!models/deck_model",
			"order!models/card_model",

	],
	function( require ) {

		var spine = require('libs/spine/spine')
		log("----------------------------------------------Initilizing App ----------------------" );

		$(document).ready(function(){
			app = new App({ el: $("body")});
		});
    }
);

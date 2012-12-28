class MultiplayerController extends Spine.Controller
	constructor: ->
		super

	onCreateCard: ( card ) ->
		console.log("Card is Created", card );


	onShuffle: ( area ) ->
		console.log( "Area has shuffled ", area.name, area.id);

	onMoveCard: ( card ) ->
		console.log( "Card has moved ", card.controller.location );

	onCardChangesArea: ( area ) ->
		console.log( "Card has changed area ", area.name, area.id);

	sendEvent: ->

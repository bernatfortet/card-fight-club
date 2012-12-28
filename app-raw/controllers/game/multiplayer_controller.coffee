class MultiplayerController extends Spine.Controller
	constructor: ->
		super

	onCreateCard: ( card ) ->
		console.log("Card is Created", card );


	onShuffle: ( area ) ->
		console.log( "Area has shuffled ", area.name, area.id);

	onMoveCard: ( cardModel ) ->
		#invertedLocation = card.location
		#invertedLocation.y = 1 - invertedLocation
		console.log( "Card has moved ", cardModel.controller.getLocation() );

	onCardChangesArea: ( area ) ->
		console.log( "Card has changed area ", area.name, area.id);

	onFlipCardUp: ( cardModel ) ->
		console.log( "Card has flipped Up ", cardModel );

	onFlipCardDown: ( cardModel ) ->
		console.log( "Card has flipped Down ", cardModel );


	sendEvent: ->

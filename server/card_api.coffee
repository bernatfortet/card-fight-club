tutor = Meteor.require('tutor');
Future = Meteor.require("fibers/future")

Meteor.Router.add(
	"/api/v1/cards/:id.json", ( cardId ) ->

		future = new Future();

		tutor.card( +cardId, ( err, card ) =>
			future.return( EJSON.stringify(card) )
		)

		return future.wait();

)

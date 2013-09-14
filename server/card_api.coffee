tutor = Meteor.require('tutor');
Future = Meteor.require("fibers/future")

Meteor.Router.add(
	"/api/v1/cards/:id", ( cardId ) ->

		future = new Future();

		tutor.card( +cardId, ( err, card ) =>
			if( err )
				console.log err
			else
				future.return( EJSON.stringify(card) )
		)

		return future.wait();

)

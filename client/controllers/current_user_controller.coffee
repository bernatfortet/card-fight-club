class @CurrentUserController

	constructor: ->


		Template.current_user.currentMatch = ->
			return Session.get('currentMatchId')

		Template.current_user.identity = ->
			if( Meteor.user() )
				#console.log Meteor.user()
				if( Meteor.user().username )
					return Meteor.user().username
				else if( Meteor.user().emails[0] )
					return Meteor.user().emails[0].address

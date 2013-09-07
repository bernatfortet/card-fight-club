
Meteor.subscribe( 'users' )
Meteor.subscribe( 'userStatus' )
Meteor.subscribe( 'matches' )

matchesController = new MatchesController()
currentUserController = new CurrentUserController()
loginController = new LoginController()

Template.users_list.users = ->
	#console.log Meteor.users.find().fetch()
	Meteor.users.find()
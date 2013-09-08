
Meteor.subscribe( 'users' )
Meteor.subscribe( 'userStatus' )
Meteor.subscribe( 'matches' )

matchesController = new MatchesController()
currentUserController = new CurrentUserController()
loginController = new LoginController()

Template.users_list.users = ->
	#console.log Meteor.users.find().fetch()
	Meteor.users.find()

Template.users_list_item.events(
	"click .ChallengeUser": ( event, template ) =>
		challengedUserId = $(event.currentTarget).attr('id')
		challenge( challengedUserId )
)

challenge = ( userId ) ->
	chatStream.emit('challenge', userId);
	console.log 'Challenging user:', userId


chatStream.on "challenge", ( message ) ->
	console.log "user: " + message

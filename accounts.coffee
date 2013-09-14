
if( Meteor.isServer )
	Accounts.onCreateUser (options, user) ->
		if( options.profile )

			#want the users facebook pic and it is not provided by the facebook.service
			facebookPicture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?width=200&height=200"
			user.profile =
				picture: facebookPicture
				name: user.services.facebook.first_name
				full_name: user.services.facebook.name
				username: user.services.facebook.username
				current_deck_id: "99PvQu4ne4XjFWRtC"

		return user

	Accounts.loginServiceConfiguration.remove
		service: "facebook"

	Accounts.loginServiceConfiguration.insert
		service: "facebook"
		appId: '175176609272912' #Meteor.settings.facebookAppId
		secret: '77dccedfe6fe59ff45eb462c35b19a0f' #Meteor.settings.facebookSecret

###
if( Meteor.isClient )
	Accounts.ui.config(
		passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
	)
###
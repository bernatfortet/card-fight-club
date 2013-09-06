class @LoginController

	connectedToInternet: false

	constructor: ->
		this.setListeners()

	setListeners: ->
		# This two functions in one line format
		Template.user_logged_out.events(

			"click #LoginWithFacebook": ( event, template ) =>
				this.loginWithFacebook()
			"click #LoginWithPassword": ( event, template ) =>
				console.log $(event.currentTarget)
				username = $('#LoginUsername').val()
				password = $('#LoginPassword').val()
				this.loginWithPassword( username, password )
		)

		Template.user_info.events(
			"click #Logout": ( event, template ) =>
				this.logout()
		)

	loginWithFacebook: ->
		Meteor.loginWithFacebook( 
			requestPermissions: [ 'email' ]
		, ->
			if( error )
				console.log 'Error on Login', error
			else
				console.log 'Login succesful'

		)

	loginWithPassword: ( username, password) ->

		console.log username, password
		Meteor.loginWithPassword( username, password, (error) ->
			if( error )
				console.log 'Error on Login', err
			else
				console.log 'Login succesful'

		)


	logout: ->
		Meteor.logout( ( error ) ->
			if( error )
				console.log 'Error on Logout'
			else
				console.log 'Logout succesful'

		)
	
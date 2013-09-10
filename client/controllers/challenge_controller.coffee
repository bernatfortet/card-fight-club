class @ChallengeController

	challengeStatus:
		challenge_accepted: 'challenge_accepted'
		challenge_accepted: 'challenge_accepted'

	params: null

	constructor: ->

		Template.users_list_item.events(
			"click .ChallengeUser": ( event, template ) =>
				challengedUserId = $(event.currentTarget).attr('id')
				this.sendChallange( challengedUserId )
		)

		Template.challenge.events(
			"click .Accept": ( event, template ) =>
				this.acceptChallange()
			"click .Refuse": ( event, template ) =>
				this.denyChallange()
		)


		# Challenge Received
		matchesStream.on "onChallenge", 		this.onReceiveChallenge
		matchesStream.on "challengeAccepeted", 	this.onChallangeIsAccepted
		matchesStream.on "challengeRefused", 	this.onChallangeIsRefused


	sendChallange: ( challengedUserId ) ->
		params =
			challengerUserId: Meteor.userId()
			challengedUserId: challengedUserId

		matchesStream.emit('onChallenge', params );
		Session.set('status', 'challenge_sent')

	onReceiveChallenge: ( params ) =>
		Session.set('status', 'challenge_received')
		#Server has to set user Status as challegne_received or being_challenged
		Session.set('challengerUserId', params.challengerUserId )

	acceptChallange: () ->
		params =
			challengerUserId: Session.get('challengerUserId')
			challengedUserId: Meteor.userId()

		matchesStream.emit('challengeAccepeted', params );
		Session.set('status', 'challenge_accepted')
		#Session.set('status', 'challenge')

	denyChallange: ( params ) ->
		params =
			challengerUserId: Session.get('challengerUserId')
			challengedUserId: Meteor.userId()

		matchesStream.emit('challengeRefused', params );
		#Session.set('status', 'challenge')

	onChallangeIsAccepted: ( params ) ->
		Session.set('status', 'challenge_accepted')
		console.log 'Challenge Accepeted, Move to Match'

	onChallangeIsRefused: ( params ) ->
		Session.set('status', 'challenge_refused')
		console.log 'Challange has been denied'
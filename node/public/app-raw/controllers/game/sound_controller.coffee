class SoundController extends Spine.Controller

	template: '
		<audio id="${soundId}">
			<source src="${soundSource}" type="audio/${soundType}">
		</div>
	'
	soundList:
		0: "card_flip"
		1: "deck_shuffle"

	constructor: ->
		super

		for index of this.soundList
			this.renderSound( this.soundList[index] )

	renderSound: ( soundName ) ->
		soundType = "ogg"
		console.log( "sounds/#{soundName}.#{soundType}" );
		params =
			soundId: soundName
			soundSource: "sounds/#{soundName}.#{soundType}"
			soundType: soundType

		this.el.append( $.tmpl( this.template, params ) )

	playSound: ( soundName ) ->
		$("##{soundName}")[0].play()
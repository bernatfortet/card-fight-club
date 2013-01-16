class SoundController extends Spine.Controller

	template: '
		<audio id="${soundId}">
			<source src="${soundSource}" type="audio/${soundType}">
		</div>
	'
	soundList: new Array(
		"flipCard"
		"shuffleDeck"
		"throwDice"
	)

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
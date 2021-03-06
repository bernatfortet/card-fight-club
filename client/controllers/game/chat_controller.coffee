class @ChatController extends Spine.Controller
	template: '
		<div class="msg">
			<span class="player">${player}</span><span class="content">${content}</span>
		</div>
	'
	#<div class="divider"></div>

	elements:
		".Conversation": "conversation"

	constructor: ->
		super

	renderMsg: ( params ) ->
		console.log 'sendMessage', params
		params.player = params.userName

		this.conversation.append( $.tmpl( this.template, params ) )


		this.conversation.scrollTo( "100%" );
		this.el.find(".msg").last().attr("state", "Seen")

	flashInput: () =>
		this.el.find(".Flash").attr("state", "Shown")
		cssflashDuration = parseFloat( this.el.find(".Flash").css("transitionDuration") ) * 1000
		setTimeout( =>
			this.el.find(".Flash").attr("state", "HIdden")
		, cssflashDuration )


	renderTapMsg: ( params ) ->
		cardName = Card.find( params.cardId ).name
		params.content = " taps '#{cardName}'"

		this.renderMsg( params )

	renderUntapMsg: ( params ) ->
		cardName = Card.find( params.cardId ).name
		params.content = " untapps '#{cardName}'"

		this.renderMsg( params )

	renderFlipUpMsg: ( params ) ->
		cardName = Card.find( params.cardId ).name
		params.content = " flips up '#{cardName}'"

		this.renderMsg( params )

	renderFlipDownMsg: ( params ) ->
		cardIsInHandArea = Area.find( Card.find( params.cardId ).areaId ).name == "hand"
		if( !cardIsInHandArea ) 
			cardName = "'"+Card.find( params.cardId ).name+"'"
		else
			cardName = "a card"

		params.content = " flips down #{cardName}"

		this.renderMsg( params )

	renderDrawFromArea: ( params ) ->
		areaName = Area.find( Card.find( params.cardId ).areaId ).name
		params.content = " draws from #{areaName}"

		this.renderMsg( params )

	renderCardAreaChanges: ( params ) ->
		previousAreaName = Area.find( Card.find( params.cardId ).areaId ).name
		areaNamesAreTheSame = previousAreaName == params.areaName
		return if( areaNamesAreTheSame )
		cardIsVisible = Card.find( params.cardId ).controller.isVisible()
		if( cardIsVisible ) 
			cardName = "'"+Card.find( params.cardId ).name+"'"
		else
			cardName = "a card"

		params.content = " moves #{cardName} from #{previousAreaName} to #{params.areaName}"

		this.renderMsg( params )

	renderTurnPassing: ( params ) ->
		params.content = " Passes Turn --------------------------"

		this.renderMsg( params )

	renderSystemMsg: ( params ) =>
		params.content = " #{params.msg}"
		this.renderMsg( params )

	renderChatMsg: ( params ) =>
		params.content = ": #{params.msg}"
		this.renderMsg( params )

	renderThrowDice: ( params ) =>
		params.content = " throws a dice: #{params.diceResult}"
		this.renderMsg( params )



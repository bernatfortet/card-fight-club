class ChatController extends Spine.Controller
	template: '
		<div class="msg">
			<span class="player">${player}</span><span class="content">${content}</span>
		</div>
	'
	#<div class="divider"></div>
	constructor: ->
		super

	renderMsg: ( msgData ) ->
		this.el.find(".Conversation").append( $.tmpl( this.template, msgData ) )

	flashInput: () =>
		this.el.find(".Flash").attr("state", "Shown")
		cssflashDuration = parseFloat( this.el.find(".Flash").css("transitionDuration") ) * 1000
		setTimeout( =>
			this.el.find(".Flash").attr("state", "HIdden")
		, cssflashDuration )


	renderTapMsg: ( params ) ->
		cardName = Card.find( params.cardId ).name
		msgData =
			player: User.find( params.userId ).name
			content: " taps '#{cardName}'"

		this.renderMsg( msgData )

	renderUntapMsg: ( params ) ->
		cardName = Card.find( params.cardId ).name
		msgData =
			player: User.find( params.userId ).name
			content: " untapps '#{cardName}'"

		this.renderMsg( msgData )

	renderFlipUpMsg: ( params ) ->
		cardName = Card.find( params.cardId ).name
		msgData =
			player: User.find( params.userId ).name
			content: " flips up '#{cardName}'"

		this.renderMsg( msgData )

	renderFlipDownMsg: ( params ) ->
		cardIsInHandArea = Area.find( Card.find( params.cardId ).areaId ).name == "hand"
		if( !cardIsInHandArea ) 
			cardName = "'"+Card.find( params.cardId ).name+"'"
		else
			cardName = "a card"

		msgData =
			player: User.find( params.userId ).name
			content: " flips down #{cardName}"

		this.renderMsg( msgData )

	renderDrawFromArea: ( params ) ->
		areaName = Area.find( Card.find( params.cardId ).areaId ).name
		msgData =
			player: User.find( params.userId ).name
			content: " draws from #{areaName}"

		this.renderMsg( msgData )


	renderCardAreaChanges: ( params ) ->
		previousAreaName = Area.find( Card.find( params.cardId ).areaId ).name
		areaNamesAreTheSame = previousAreaName == params.areaName
		return if( areaNamesAreTheSame )
		cardIsVisible = Card.find( params.cardId ).controller.isVisible()
		if( cardIsVisible ) 
			cardName = "'"+Card.find( params.cardId ).name+"'"
		else
			cardName = "a card"

		msgData =
			player: User.find( params.userId ).name
			content: " moves #{cardName} from #{previousAreaName} to #{params.areaName}"

		this.renderMsg( msgData )

	renderChatMsg: ( params ) =>
		msgData =
			player: params.userName
			content: ": #{params.msg}"
		this.renderMsg( msgData )



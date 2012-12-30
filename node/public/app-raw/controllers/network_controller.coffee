class NetworkController extends Spine.Controller
	constructor: ->
		super

		this.server = io.connect('http:'+serverIp+':8080')

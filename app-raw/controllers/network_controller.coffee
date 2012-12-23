class NetworkController extends Spine.Controller
	constructor: ->
		super

		this.server = io.connect('http:localhost:8080')

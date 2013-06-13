# Dependencies
http 		= require("http")
socket 		= require("socket.io")
express 	= require("express")
routes 		= require("./routes")
socket 		= require("socket.io")

tutor 		= require("tutor")
multiplayer = require("./lib/multiplayer.js")
app			= express()


app.configure ->
	app.set "port", process.env.PORT or 8080
	app.set "views", __dirname + "/views"
	app.set "view engine", "jade"
	app.use express.favicon()
	app.use express.logger("dev")
	app.use express.bodyParser()
	app.use express.methodOverride()
	app.use express.cookieParser("your secret here")
	app.use express.session()
	app.use app.router
	app.use require("less-middleware")(src: __dirname + "/public")
	app.use express.static(__dirname + "/public")

app.configure "development", ->
	app.use express.errorHandler()

app.get "/", routes.index


app.get('/api/v1/cards/:id', (request, response) ->

	tutor.card( +request.params.id, (err, card) ->
		console.log( card )
		console.log( card.image_url )		
		response.send( card );
	)
)

server = http.createServer(app).listen(app.get("port"), (request, response) ->
	console.log "Express server listening on port " + app.get("port")
)

io = socket.listen(server)
multiplayer.init io


#tutor.card 'Demonic Tutor', (err, card) ->

#http://localhost:8080/card/172783
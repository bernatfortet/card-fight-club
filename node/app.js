/**
 * Module dependencies.
 */

var socket = require('socket.io');

var express = require('express')
  , routes = require('./routes')
  , socket = require('socket.io')
  , multiplayer = require('./libs/multiplayer.js')
  , http = require('http');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function( request, response ){
  console.log("Express server listening on port " + app.get('port'));
});



var io = socket.listen(server);

multiplayer.init( io );




//Multiplayer.init();
//Rooms.init();
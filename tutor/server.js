var api, app, express, port, responder, _ref;

express = require('express');

api = require('./gatherer');

responder = function(fn) {
  return function(req, res) {
    return fn.call(req, function(err, data) {
      var callback, text, _ref;
      if ('error' in data || (err != null)) {
        console.log("Response error " + data.error + ", status " + data.status);
        return res.json(data, (_ref = data.status) === 301 || _ref === 302 ? 404 : data.status);
      } else if (callback = req.param('callback')) {
        text = "" + callback + "(" + (JSON.stringify(data)) + ")";
        return res.send(text, {
          'Content-Type': 'text/plain'
        });
      } else {
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.json(data);
      }
    });
  };
};

app = express.createServer();

app.get(/^\/card\/(\d+)(?:\/(\w+))?\/?$/, responder(api.fetch_card));

app.get('/card/:name', responder(api.fetch_card));

app.get(/^\/language\/(\d+)(?:\/(\w+))?\/?$/, responder(api.fetch_language));

app.get('/language/:name', responder(api.fetch_language));

app.get('/set/:name/:page?', responder(api.fetch_set));

app.get('/sets', responder(api.sets));

app.get('/formats', responder(api.formats));

app.get('/types', responder(api.types));

port = (_ref = process.env.PORT) != null ? _ref : 3000;

app.listen(port, function() {
  return console.log("Listening on " + port);
});

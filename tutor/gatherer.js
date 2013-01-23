var card_query_string, gatherer_url, index, parser, request, request_and_parse;

request = require('request');

parser = require('./parser');

gatherer_url = 'http://gatherer.wizards.com/Pages/';

card_query_string = function(arg) {
  var params, qs;
  params = (function() {
    switch (typeof arg) {
      case 'object':
        return arg;
      case 'number':
        return {
          id: arg
        };
      case 'string':
        return {
          name: arg
        };
      default:
        throw new TypeError;
    }
  })();
  qs = '';
  if ('id' in params) {
    qs += '?multiverseid=' + params.id;
    if (params.part) qs += '&part=' + encodeURIComponent(params.part);
  } else {
    qs += '?name=' + encodeURIComponent(params.name);
  }
  if (params.printed) qs += '&printed=true';
  return qs;
};

request_and_parse = function(url, fn, callback) {
  return request({
    url: url,
    followRedirect: false
  }, function(error, _arg, body) {
    var statusCode;
    statusCode = _arg.statusCode;
    if (statusCode === 200) {
      return fn(body, callback);
    } else {
      return callback(new Error('Card Not Found'));
    }
  });
};

exports.card = function(params, callback) {
  var url;
  url = gatherer_url + 'Card/Details.aspx' + card_query_string(params);
  return request_and_parse(url, parser.card, callback);
};

exports.languages = function(params, callback) {
  var url;
  url = gatherer_url + 'Card/Languages.aspx' + card_query_string(params);
  return request_and_parse(url, parser.language, callback);
};

exports.set = function(params, callback) {
  var name, page, url;
  if (typeof params === 'string') {
    name = params;
    page = 0;
  } else {
    name = params.name;
    if ('page' in params) {
      page = params.page - 1;
      if (page < 0) {
        callback(new Error('Page must be a positive number'));
        return;
      }
    } else {
      page = 0;
    }
  }
  url = gatherer_url + 'Search/Default.aspx';
  url += "?set=[%22" + (encodeURIComponent(name)) + "%22]&page=" + page;
  return request({
    url: url
  }, function(error, response, body) {
    return parser.set(body, callback);
  });
};

exports.index = function(callback) {
  return request({
    url: gatherer_url
  }, function(error, response, body) {
    var count, parse_and_merge, results;
    count = 3;
    results = {};
    parse_and_merge = function(method_name) {
      return parser[method_name](body, function(err, local_results) {
        count--;
        results[method_name] = local_results;
        if (count === 0) return callback(null, results);
      });
    };
    parse_and_merge('sets');
    parse_and_merge('formats');
    return parse_and_merge('types');
  });
};

exports.fetch_language = function(callback) {
  var id, part, url, _ref;
  url = gatherer_url + 'Card/Languages.aspx';
  if ('name' in this.params) {
    url += '?name=' + encodeURIComponent(this.params.name);
  } else {
    _ref = this.params, id = _ref[0], part = _ref[1];
    url += '?multiverseid=' + id;
    if (part) url += '&part=' + encodeURIComponent(part);
  }
  return request({
    url: url,
    followRedirect: false
  }, function(error, response, body) {
    var status;
    if (error || (status = response.statusCode) !== 200) {
      callback(error, {
        error: error,
        status: status
      });
      return;
    }
    return parser.language(body, callback);
  });
};

exports.fetch_card = function(callback) {
  var id, part, printed, url, _ref;
  printed = this.query.printed === 'true';
  url = gatherer_url + 'Card/Details.aspx';
  if ('name' in this.params) {
    url += '?name=' + encodeURIComponent(this.params.name);
  } else {
    _ref = this.params, id = _ref[0], part = _ref[1];
    url += '?multiverseid=' + id;
    if (part) url += '&part=' + encodeURIComponent(part);
  }
  if (printed) url += '&printed=true';
  return request({
    url: url,
    followRedirect: false
  }, function(error, response, body) {
    var status;
    if (error || (status = response.statusCode) !== 200) {
      callback(error, {
        error: error,
        status: status
      });
      return;
    }
    return parser.card(body, callback, {
      printed: printed
    });
  });
};

exports.fetch_set = function(callback) {
  var page, url, _ref;
  page = +((_ref = this.params.page) != null ? _ref : 1);
  url = gatherer_url + 'Search/Default.aspx';
  url += "?set=[%22" + (encodeURIComponent(this.params.name)) + "%22]&page=" + (page - 1);
  return request({
    url: url
  }, function(error, response, body) {
    return parser.set(body, callback);
  });
};

index = function(name) {
  return function(callback) {
    return request({
      url: gatherer_url
    }, function(error, response, body) {
      return parser[name](body, callback);
    });
  };
};

['formats', 'sets', 'types'].forEach(function(name) {
  return exports[name] = index(name);
});

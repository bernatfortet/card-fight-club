var cheerio, collect_options, common_attrs, entities, gatherer_base_card_url, gatherer_image_handler, get_converted_mana_cost, get_mana_cost, get_name, get_text, get_versions, gid_specific_attrs, languages, list_view_attrs, meaningful, prefix, supertypes, symbols, text_content, to_stat, to_symbol, vanguard_modifier,
  __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __hasProp = Object.prototype.hasOwnProperty,
  __slice = Array.prototype.slice;

cheerio = require('cheerio');

entities = require('entities');

supertypes = ['Basic', 'Legendary', 'Ongoing', 'Snow', 'World'];

gatherer_base_card_url = 'http://gatherer.wizards.com/Pages/Card/Details.aspx';

gatherer_image_handler = 'http://gatherer.wizards.com/Handlers/Image.ashx';

prefix = '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent';

symbols = {
  White: 'W',
  'Phyrexian White': 'W/P',
  Blue: 'U',
  'Phyrexian Blue': 'U/P',
  Black: 'B',
  'Phyrexian Black': 'B/P',
  Red: 'R',
  'Phyrexian Red': 'R/P',
  Green: 'G',
  'Phyrexian Green': 'G/P',
  Two: '2',
  'Variable Colorless': 'X',
  Snow: 'S',
  Tap: 'T',
  Untap: 'Q'
};

languages = {
  'Chinese Simplified': 'zh-TW',
  'Chinese Traditional': 'zh-CN',
  'German': 'de',
  'English': 'en',
  'French': 'fr',
  'Italian': 'it',
  'Japanese': 'ja',
  'Korean': 'kr',
  'Portuguese': 'pt-BR',
  'Portuguese (Brazil)': 'pt-BR',
  'Russian': 'ru',
  'Spanish': 'es'
};

meaningful = function(value) {
  return !(value === void 0 || Number.isNaN(value));
};

to_symbol = function(alt) {
  var a, b, match, _ref;
  match = /^(\S+) or (\S+)$/.exec(alt);
  if (match && (_ref = match.slice(1), a = _ref[0], b = _ref[1], _ref)) {
    return "" + (to_symbol(a)) + "/" + (to_symbol(b));
  } else {
    return symbols[alt] || alt;
  }
};

text_content = function(obj) {
  var $;
  if (!obj) return;
  $ = this.$;
  obj = typeof obj === 'string' ? this.get(obj) : $(obj);
  if (!obj) return;
  obj.find('img').each(function() {
    return $(this).replaceWith("{" + (to_symbol($(this).attr('alt'))) + "}");
  });
  return obj.text().trim();
};

get_name = function(identifier) {
  return function() {
    var match, name;
    if (!(name = this.text(identifier))) return;
    if (match = /^(.+)’(.+) [(](\1'\2)[)]$/.exec(name)) {
      return match[3];
    } else {
      return name;
    }
  };
};

get_mana_cost = function(identifier) {
  return function() {
    var text;
    if (text = this.text(identifier)) return text;
  };
};

get_converted_mana_cost = function(identifier) {
  return function() {
    return +this.text(identifier) || 0;
  };
};

get_text = function(identifier) {
  return function() {
    var el, p, paragraphs;
    if (!(el = this.get(identifier))) return;
    paragraphs = (function() {
      var _i, _len, _ref, _results;
      _ref = el.children();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push(this.text(el));
      }
      return _results;
    }).call(this);
    paragraphs = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = paragraphs.length; _i < _len; _i++) {
        p = paragraphs[_i];
        if (p) _results.push(p);
      }
      return _results;
    })();
    if (paragraphs.length) return paragraphs.join('\n\n');
  };
};

get_versions = function(identifier) {
  return function() {
    var $, versions, _ref;
    versions = {};
    $ = this.$;
    if ((_ref = this.get(identifier)) != null) {
      _ref.find('img').each(function() {
        var expansion, img, rarity, _ref2;
        img = $(this);
        _ref2 = /^(.*\S)\s+[(](.+)[)]$/.exec(img.attr('alt')).slice(1), expansion = _ref2[0], rarity = _ref2[1];
        expansion = entities.decode(expansion);
        return versions[/\d+$/.exec(img.parent().attr('href'))] = {
          expansion: expansion,
          rarity: rarity
        };
      });
    }
    return versions;
  };
};

vanguard_modifier = function(pattern) {
  return function() {
    var _ref;
    return +((_ref = pattern.exec(this.text('Hand/Life'))) != null ? _ref[1] : void 0);
  };
};

to_stat = function(stat_as_string) {
  var stat_as_number;
  stat_as_number = +(stat_as_string != null ? stat_as_string.replace('{1/2}', '.5') : void 0);
  if (Number.isNaN(stat_as_number)) {
    return stat_as_string;
  } else {
    return stat_as_number;
  }
};

common_attrs = {
  name: get_name('Card Name'),
  mana_cost: get_mana_cost('Mana Cost'),
  converted_mana_cost: get_converted_mana_cost('Converted Mana Cost'),
  types: function(data) {
    var subtypes, text, type, types, _i, _len, _ref, _ref2;
    if (!(text = this.text('Types'))) return;
    _ref = /^(.+?)(?:\s+\u2014\s+(.+))?$/.exec(text).slice(1), types = _ref[0], subtypes = _ref[1];
    data.supertypes = [];
    data.types = [];
    _ref2 = types.split(/\s+/);
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      type = _ref2[_i];
      data[__indexOf.call(supertypes, type) >= 0 ? 'supertypes' : 'types'].push(type);
    }
    data.subtypes = (subtypes != null ? subtypes.split(/\s+/) : void 0) || [];
  },
  text: get_text('Card Text'),
  color_indicator: function() {
    return this.text('Color Indicator');
  },
  watermark: function() {
    return this.text('Watermark');
  },
  stats: function(data) {
    var power, text, toughness, _ref;
    if (!(text = this.text('P/T'))) return;
    _ref = /^(.+?)\s+\/\s+(.+)$/.exec(text).slice(1), power = _ref[0], toughness = _ref[1];
    data.power = to_stat(power);
    data.toughness = to_stat(toughness);
  },
  loyalty: function() {
    return +this.text('Loyalty');
  },
  versions: function() {
    var el, expansion, id, rarity, versions;
    versions = get_versions('All Sets').call(this);
    if (Object.keys(versions).length !== 0) return versions;
    expansion = gid_specific_attrs.expansion, rarity = gid_specific_attrs.rarity;
    if ((expansion = expansion.call(this)) && (rarity = rarity.call(this))) {
      el = this.$(prefix + 'Anchors_DetailsAnchors_Printings').find('a');
      id = el.attr('href').match(/multiverseid=(\d+)/)[1];
      versions[id] = {
        expansion: expansion,
        rarity: rarity
      };
    }
    return versions;
  },
  community_rating: function() {
    var pattern, rating, text, votes, _ref;
    text = this.$('.textRating').text().replace(/\s+/g, '');
    pattern = /^Rating:(\d(?:[.]\d+)?)\/5[(](\d+)votes?[)]$/;
    _ref = pattern.exec(text).slice(1), rating = _ref[0], votes = _ref[1];
    return {
      rating: +rating,
      votes: +votes
    };
  },
  rulings: function() {
    var d, date, el, m, ruling, rulings, y, _i, _len, _ref, _ref2, _ref3;
    rulings = [];
    _ref = this.$('.cardDetails').find('tr.post');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      _ref2 = this.$(el).children(), date = _ref2[0], ruling = _ref2[1];
      _ref3 = this.text(date).split('/'), m = _ref3[0], d = _ref3[1], y = _ref3[2];
      if (m.length === 1) m = '0' + m;
      if (d.length === 1) d = '0' + d;
      rulings.push(["" + y + "-" + m + "-" + d, this.text(ruling).replace(/[ ]{2,}/g, ' ')]);
    }
    return rulings;
  }
};

gid_specific_attrs = {
  flavor_text: function(data) {
    var el, flavor, match, pattern, text;
    if (!(flavor = this.get('Flavor Text'))) return;
    el = flavor.children().last();
    if (match = /^(\u2014|\u2015\u2015|\uFF5E)\s*(.+)$/.exec(this.text(el))) {
      data.flavor_text_attribution = match[2];
      el.remove();
    }
    pattern = /^["\u00AB\u201E\u300C]\s*(.+?)\s*["\u00BB\u300D]([.]?)$/;
    text = ((function() {
      var _i, _len, _ref, _results;
      _ref = flavor.children();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push(this.text(el));
      }
      return _results;
    }).call(this)).join('\n');
    if (match && (match = pattern.exec(text))) text = match[1] + match[2];
    return text;
  },
  hand_modifier: vanguard_modifier(/Hand Modifier: ([+-]\d+)/),
  life_modifier: vanguard_modifier(/Life Modifier: ([+-]\d+)/),
  expansion: function() {
    return this.text(this.get('Expansion').find('a:last-child'));
  },
  rarity: function() {
    return this.text('Rarity');
  },
  number: function() {
    return to_stat(this.text('Card #'));
  },
  artist: function() {
    return this.text('Artist');
  }
};

list_view_attrs = {
  name: get_name('.cardTitle'),
  mana_cost: get_mana_cost('.manaCost'),
  converted_mana_cost: get_converted_mana_cost('.convertedManaCost'),
  types: function(data) {
    var loyalty, power, regex, subtypes, text, toughness, type, types, _i, _len, _ref, _ref2;
    if (!(text = this.text('.typeLine'))) return;
    regex = /^([^\u2014]+?)(?:\s+\u2014\s+(.+?))?(?:\s+[(](?:([^\/]+?)\s*\/\s*([^\/]+)|(\d+))[)])?$/;
    _ref = regex.exec(text).slice(1), types = _ref[0], subtypes = _ref[1], power = _ref[2], toughness = _ref[3], loyalty = _ref[4];
    data.supertypes = [];
    data.types = [];
    _ref2 = types.split(/\s+/);
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      type = _ref2[_i];
      data[__indexOf.call(supertypes, type) >= 0 ? 'supertypes' : 'types'].push(type);
    }
    data.subtypes = (subtypes != null ? subtypes.split(/\s+/) : void 0) || [];
    data.power = to_stat(power);
    data.toughness = to_stat(toughness);
    data.loyalty = +loyalty;
  },
  text: get_text('.rulesText'),
  versions: get_versions('.setVersions')
};

exports.language = function(body, callback, options) {
  var $, data;
  if (options == null) options = {};
  $ = cheerio.load(body);
  data = {};
  $('tr.cardItem').each(function() {
    var $lang, $name, language, trans_card_name, trans_language, _ref;
    _ref = $(this).children(), trans_card_name = _ref[0], language = _ref[1], trans_language = _ref[2];
    $name = $(trans_card_name);
    $lang = $(language);
    return data[languages[$lang.text().trim()]] = {
      id: +$name.find('a').attr('href').match(/multiverseid=(\d+)/)[1],
      name: $name.text().trim()
    };
  });
  return process.nextTick(function() {
    return callback(null, data);
  });
};

exports.card = function(body, callback, options) {
  var $, action, ctx, data, fn, key, params, title1, title2, value;
  if (options == null) options = {};
  $ = cheerio.load(body);
  ctx = {
    $: $,
    text: text_content,
    get: function(label) {
      var el, _i, _len, _ref;
      _ref = $('.label');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        if (this.text(el).replace(/:$/, '') === label) return $(el).next();
      }
    }
  };
  title1 = ctx.text($(prefix + 'Header_subtitleDisplay'));
  title2 = ctx.text($(prefix + '_ctl06_nameRow').children('.value'));
  $("" + prefix + "_cardComponent" + (+(title1 !== title2))).remove();
  data = {};
  for (key in common_attrs) {
    if (!__hasProp.call(common_attrs, key)) continue;
    fn = common_attrs[key];
    value = fn.call(ctx, data);
    if (meaningful(value)) data[key] = value;
  }
  action = entities.decode($('#aspnetForm').attr('action'));
  params = action.substr(action.indexOf('?'));
  data.gatherer_url = gatherer_base_card_url + params;
  data.image_url = gatherer_image_handler + '?' + /(multiverseid|name)=[^&]+/.exec(params)[0] + '&type=card';
  if (/multiverseid/.test(data.gatherer_url)) {
    for (key in gid_specific_attrs) {
      if (!__hasProp.call(gid_specific_attrs, key)) continue;
      fn = gid_specific_attrs[key];
      value = fn.call(ctx, data);
      if (meaningful(value)) data[key] = value;
    }
  }
  if (options.printed) {
    data.type = __slice.call(data.supertypes).concat(__slice.call(data.types), __slice.call(data.subtypes)).join(' ');
    delete data.supertypes;
    delete data.types;
    delete data.subtypes;
  }
  return process.nextTick(function() {
    return callback(null, data);
  });
};

exports.set = function(body, callback) {
  var $, card, cards, ctx, data, el, error, expansion, fn, href, id, key, page, pages, param, params, rarity, value, _i, _len, _ref, _ref2, _ref3, _ref4, _ref5;
  $ = cheerio.load(body);
  ctx = {
    $: $,
    text: text_content
  };
  pages = (function() {
    var link, number, _i, _len, _ref;
    _ref = $('.paging').find('a').get().reverse();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      link = _ref[_i];
      if ((number = +ctx.text(link)) > 0) return number;
    }
    return 1;
  })();
  id = '#ctl00_ctl00_ctl00_MainContent_SubContent_topPagingControlsContainer';
  page = +ctx.text($(id).children('a[style="text-decoration:underline;"]'));
  if (+((_ref = $('#aspnetForm').attr('action').match(/page=(\d+)/)) != null ? _ref[1] : void 0) + 1 === page) {
    cards = [];
    _ref2 = $('.cardItem');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      el = _ref2[_i];
      el = $(el);
      card = {};
      for (key in list_view_attrs) {
        if (!__hasProp.call(list_view_attrs, key)) continue;
        fn = list_view_attrs[key];
        ctx.get = function(selector) {
          return el.find(selector);
        };
        href = el.find('.cardTitle').find('a').attr('href');
        _ref3 = /multiverseid=(\d+)/.exec(href), param = _ref3[0], id = _ref3[1];
        params = '?' + param;
        card.gatherer_url = gatherer_base_card_url + params;
        card.image_url = gatherer_image_handler + params + '&type=card';
        _ref4 = get_versions('.setVersions').call(ctx)[id], expansion = _ref4.expansion, rarity = _ref4.rarity;
        card.expansion = expansion;
        card.rarity = rarity;
        value = fn.call(ctx, card);
        if (meaningful(value)) card[key] = value;
      }
      for (key in card) {
        if (!__hasProp.call(card, key)) continue;
        value = card[key];
        if (!meaningful(value)) delete card[key];
      }
      cards.push(card);
    }
    _ref5 = [
      null, {
        page: page,
        pages: pages,
        cards: cards
      }
    ], error = _ref5[0], data = _ref5[1];
  } else {
    error = 'Not Found';
    data = {
      error: error,
      status: 404
    };
  }
  return process.nextTick(function() {
    return callback(error, data);
  });
};

collect_options = function(label) {
  return function(body, callback) {
    var $, id, o, v, values;
    $ = cheerio.load(body);
    id = "#ctl00_ctl00_MainContent_Content_SearchControls_" + label + "AddText";
    values = (function() {
      var _i, _len, _ref, _results;
      _ref = $(id).children();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        o = _ref[_i];
        _results.push($(o).attr('value'));
      }
      return _results;
    })();
    values = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        v = values[_i];
        if (v) _results.push(entities.decode(v));
      }
      return _results;
    })();
    return process.nextTick(function() {
      return callback(null, values);
    });
  };
};

exports.sets = collect_options('set');

exports.formats = collect_options('format');

exports.types = collect_options('type');

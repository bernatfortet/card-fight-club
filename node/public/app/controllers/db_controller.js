var DBController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

DBController = (function(_super) {

  __extends(DBController, _super);

  DBController.prototype.baseMongoLabDBUrl = "https://api.mongolab.com/api/1/databases/card-fight-club/collections/";

  DBController.prototype.apiKey = "apiKey=50b9ed0fe4b0afba6ecc5836";

  DBController.prototype.tutorServerUrl = "http://localhost:3000/card/";

  DBController.prototype.deckId = "50dcf268e4b0b7b39972bf5f";

  DBController.prototype.userId = "50dcf675e4b0876155f7f7c8";

  DBController.prototype.userInfo = null;

  DBController.prototype.cardsToLoad = 0;

  function DBController() {
    this.buildUserInfo = __bind(this.buildUserInfo, this);    DBController.__super__.constructor.apply(this, arguments);
  }

  DBController.prototype.getUserInfo = function() {
    var _this = this;
    UserCard.fetch(function() {
      return _this.getUser(_this.userId, _this.buildUserInfo);
    });
    return UserCard.fetch();
  };

  DBController.prototype.buildUserInfo = function(JSON) {
    var cardId, index;
    for (index in JSON.cards) {
      cardId = JSON.cards[index];
      if (!UserCard.exists(cardId)) {
        this.getCard(cardId, this.onLoadCard, cardId);
        this.cardsToLoad = index;
      }
    }
    return app.createUser(this.userInfo, JSON);
  };

  DBController.prototype.onLoadCard = function(JSON, cardId) {
    var card;
    this.cardsToLoad--;
    card = UserCard.create({
      id: cardId,
      data: JSON
    });
    console.log(card);
    return this.finishLoadinUserInfo();
  };

  DBController.prototype.finishLoadinUserInfo = function() {
    console.log(this.cardsToLoad, this.cardsToLoad <= 0);
    if (this.cardsToLoad <= 0) {
      console.log("finished ");
      return app.createUser(this.userInfo, JSON);
    }
  };

  DBController.prototype.getUser = function(userId, callback) {
    var collection,
      _this = this;
    collection = "users/" + userId;
    return this.getData(collection, function(JSON) {
      _this.userInfo = JSON;
      return _this.getDeck(JSON.decks[0], callback);
    });
  };

  DBController.prototype.getDeck = function(deckId, callback) {
    var collection,
      _this = this;
    collection = "decks/" + deckId;
    return this.getData(collection, function(JSON) {
      if (callback) return callback(JSON);
    });
  };

  DBController.prototype.getCard = function(cardId) {
    var _this = this;
    return $.ajax({
      url: this.tutorServerUrl + cardId,
      type: "GET",
      dataType: "jsonp",
      success: function(JSON) {
        return _this.onLoadCard(JSON, cardId);
      }
    });
  };

  DBController.prototype.getData = function(collection, callback) {
    return $.ajax({
      url: this.baseMongoLabDBUrl + collection + "?" + this.apiKey,
      type: "GET",
      dataType: "json",
      success: callback
    });
  };

  DBController.prototype.setData = function(collection, callback) {
    return $.ajax({
      url: this.baseMongoLabDBUrl + collection + "?" + this.apiKey,
      data: JSON.stringify({
        "x": 1
      }),
      type: "POST",
      contentType: "application/json",
      success: callback
    });
  };

  return DBController;

})(Spine.Controller);

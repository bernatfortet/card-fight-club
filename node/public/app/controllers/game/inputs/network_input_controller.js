var NetworkInputController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

NetworkInputController = (function(_super) {

  __extends(NetworkInputController, _super);

  NetworkInputController.prototype.server = null;

  function NetworkInputController() {
    this.onCardFromAreaIsRevealedToggle = __bind(this.onCardFromAreaIsRevealedToggle, this);
    this.onCardIsFlippedDown = __bind(this.onCardIsFlippedDown, this);
    this.onCardIsFlippedUp = __bind(this.onCardIsFlippedUp, this);
    this.onCardIsTapped = __bind(this.onCardIsTapped, this);
    this.onCardAreaIsChanged = __bind(this.onCardAreaIsChanged, this);
    this.onCardIsMoved = __bind(this.onCardIsMoved, this);
    this.onCardIsRemoved = __bind(this.onCardIsRemoved, this);
    this.onCardIsCreated = __bind(this.onCardIsCreated, this);
    this.onDeckIsCreated = __bind(this.onDeckIsCreated, this);    NetworkInputController.__super__.constructor.apply(this, arguments);
    this.server = io.connect('http:' + serverIp + ':8080');
    this.setListeners();
  }

  NetworkInputController.prototype.setListeners = function() {
    this.server.on('onDeckIsCreated', this.onDeckIsCreated);
    this.server.on('onCardIsCreated', this.onCardIsCreated);
    this.server.on('onCardIsRemoved', this.onCardIsRemoved);
    this.server.on('onCardIsMoved', this.onCardIsMoved);
    this.server.on('onCardIsTapped', this.onCardIsTapped);
    this.server.on('onCardIsFlippedUp', this.onCardIsFlippedUp);
    this.server.on('onCardIsFlippedDown', this.onCardIsFlippedDown);
    return this.server.on('onCardAreaIsChanged', this.onCardAreaIsChanged);
  };

  NetworkInputController.prototype.onDeckIsCreated = function(deckData) {
    if (this.targetPlayer.deck === null) return this.onCreateDeck(deckData);
  };

  NetworkInputController.prototype.onCardIsCreated = function(params) {
    var cardModel;
    cardModel = Card.create({
      id: params.cardId,
      image_url: params.image_url,
      name: params.name,
      deck: this.targetPlayer.deck.id,
      areaId: this.targetPlayer.deckController.item.id,
      controller: null
    });
    return this.onCreateCard(cardModel);
  };

  NetworkInputController.prototype.onCardIsRemoved = function(cardId) {
    return this.onRemoveCard(cardId);
  };

  NetworkInputController.prototype.onCardIsMoved = function(params) {
    return this.onMoveCard(params.cardId, params.location);
  };

  NetworkInputController.prototype.onCardAreaIsChanged = function(params) {
    var areaId;
    areaId = this.getPlayersAreaIdFromName(params.areaName, this.targetPlayer);
    return this.onChangeCardArea(params.cardId, areaId);
  };

  NetworkInputController.prototype.onCardIsTapped = function(cardId) {
    return this.onTapCard(cardId);
  };

  NetworkInputController.prototype.onCardIsFlippedUp = function(cardId) {
    return this.onFlipCardUp(cardId);
  };

  NetworkInputController.prototype.onCardIsFlippedDown = function(cardId) {
    return this.onFlipCardDown(cardId);
  };

  NetworkInputController.prototype.onCardFromAreaIsRevealedToggle = function(params) {
    var areaId;
    areaId = this.getPlayersAreaIdFromName(params.areaName, this.targetPlayer);
    return this.onToggleRevealCardFromArea(params.cardId, areaId);
  };

  NetworkInputController.prototype.getPlayersAreaIdFromName = function(areaName, player) {
    var areaId,
      _this = this;
    areaId = null;
    Area.each(function(area) {
      if (areaName === area.name && area.controller.player === player) {
        return areaId = area.id;
      }
    });
    return areaId;
  };

  NetworkInputController.prototype.getRealId = function(id) {
    if (id[0] === "o") id = id.slice(1, id.length);
    return id;
  };

  return NetworkInputController;

})(InputController);

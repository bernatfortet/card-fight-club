var NetworkInputController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

NetworkInputController = (function(_super) {

  __extends(NetworkInputController, _super);

  NetworkInputController.prototype.server = null;

  function NetworkInputController() {
    this.onCounterIsUnattached = __bind(this.onCounterIsUnattached, this);
    this.onCounterIsAttachedToCard = __bind(this.onCounterIsAttachedToCard, this);
    this.onCounterIsSet = __bind(this.onCounterIsSet, this);
    this.onCounterIsMoved = __bind(this.onCounterIsMoved, this);
    this.onCounterIsRemoved = __bind(this.onCounterIsRemoved, this);
    this.onCounterIsCreated = __bind(this.onCounterIsCreated, this);
    this.onDiceIsThrown = __bind(this.onDiceIsThrown, this);
    this.onTurnIsReceived = __bind(this.onTurnIsReceived, this);
    this.onChatMsgIsReceived = __bind(this.onChatMsgIsReceived, this);
    this.onCardFromAreaIsRevealedToggle = __bind(this.onCardFromAreaIsRevealedToggle, this);
    this.onCardIsFlippedDown = __bind(this.onCardIsFlippedDown, this);
    this.onCardIsFlippedUp = __bind(this.onCardIsFlippedUp, this);
    this.onCardIsUntapped = __bind(this.onCardIsUntapped, this);
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
    this.server.on('onCardAreaIsChanged', this.onCardAreaIsChanged);
    this.server.on('onCardFromAreaIsRevealedToggle', this.onCardFromAreaIsRevealedToggle);
    this.server.on('onChatMsgIsReceived', this.onChatMsgIsReceived);
    this.server.on('onTurnIsReceived', this.onTurnIsReceived);
    this.server.on('onDiceIsThrown', this.onDiceIsThrown);
    this.server.on('onCounterIsCreated', this.onCounterIsCreated);
    this.server.on('onCounterIsRemoved', this.onCounterIsRemoved);
    this.server.on('onCounterIsMoved', this.onCounterIsMoved);
    this.server.on('onCounterIsSet', this.onCounterIsSet);
    this.server.on('onCounterIsAttachedToCard', this.onCounterIsAttachedToCard);
    return this.server.on('onCounterIsUnattached', this.onCounterIsUnattached);
  };

  NetworkInputController.prototype.onDeckIsCreated = function(deckData) {
    if (this.targetPlayer.deck === null) return this.onCreateDeck(deckData);
  };

  NetworkInputController.prototype.onCardIsCreated = function(params) {
    var cardModel;
    app.gameController.chatController.renderDrawFromArea(params);
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

  NetworkInputController.prototype.onCardIsRemoved = function(params) {
    return this.onRemoveCard(params.cardId);
  };

  NetworkInputController.prototype.onCardIsMoved = function(params) {
    return this.onMoveCard(params.cardId, params.location);
  };

  NetworkInputController.prototype.onCardAreaIsChanged = function(params) {
    var areaId;
    app.gameController.chatController.renderCardAreaChanges(params);
    areaId = this.getPlayersAreaIdFromName(params.areaName, this.targetPlayer);
    return this.onChangeCardArea(params.cardId, areaId);
  };

  NetworkInputController.prototype.onCardIsTapped = function(params) {
    app.gameController.chatController.renderTapMsg(params);
    return this.onTapCard(params.cardId);
  };

  NetworkInputController.prototype.onCardIsUntapped = function(params) {
    app.gameController.chatController.renderUntapMsg(params);
    return this.onUntapCard(params.cardId);
  };

  NetworkInputController.prototype.onCardIsFlippedUp = function(params) {
    app.gameController.chatController.renderFlipUpMsg(params);
    return this.onFlipCardUp(params.cardId);
  };

  NetworkInputController.prototype.onCardIsFlippedDown = function(params) {
    app.gameController.chatController.renderFlipDownMsg(params);
    return this.onFlipCardDown(params.cardId);
  };

  NetworkInputController.prototype.onCardFromAreaIsRevealedToggle = function(params) {
    var areaId;
    areaId = this.getPlayersAreaIdFromName(params.areaName, this.targetPlayer);
    return this.onToggleRevealCardFromArea(params.cardId, areaId);
  };

  NetworkInputController.prototype.onChatMsgIsReceived = function(params) {
    return app.gameController.chatController.renderChatMsg(params);
  };

  NetworkInputController.prototype.onTurnIsReceived = function(params) {
    app.gameController.chatController.renderTurnPassing(params);
    return app.gameController.humanInputController.onReceiveTurn();
  };

  NetworkInputController.prototype.onDiceIsThrown = function(params) {
    app.gameController.chatController.renderThrowDice(params);
    return app.gameController.soundController.playSound("throwDice");
  };

  NetworkInputController.prototype.onCounterIsCreated = function(params) {
    var counterModel;
    counterModel = Counter.create({
      id: params.counterId,
      number: params.counterNumber,
      attached_card_id: params.cardId,
      controller: null
    });
    return this.onCreateCounter(counterModel);
  };

  NetworkInputController.prototype.onCounterIsRemoved = function(params) {
    return this.onRemoveCounter(params.counterId);
  };

  NetworkInputController.prototype.onCounterIsMoved = function(params) {
    return this.onMoveCounter(params.counterId, params.location);
  };

  NetworkInputController.prototype.onCounterIsSet = function(params) {
    return this.onSetCounter(params.counterId, params.counterNumber);
  };

  NetworkInputController.prototype.onCounterIsAttachedToCard = function(params) {
    return this.onAttachCounterToCard(params.counterId, params.cardId);
  };

  NetworkInputController.prototype.onCounterIsUnattached = function(params) {
    return this.onUnattachCounter(params.counterId);
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

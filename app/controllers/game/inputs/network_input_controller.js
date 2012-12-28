var NetworkInputController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

NetworkInputController = (function(_super) {

  __extends(NetworkInputController, _super);

  function NetworkInputController() {
    this.onCardIsCreated = __bind(this.onCardIsCreated, this);
    this.onDeckIsCreated = __bind(this.onDeckIsCreated, this);    NetworkInputController.__super__.constructor.apply(this, arguments);
    this.setListeners();
  }

  NetworkInputController.prototype.setListeners = function() {};

  NetworkInputController.prototype.onDeckIsCreated = function(deck) {
    return Deck.create({
      name: deck.name,
      id: deck.id,
      cards: deck.cards,
      controller: this.targetPlayer.deckController
    });
  };

  NetworkInputController.prototype.onCardIsCreated = function(cardId) {
    var cardModel, realModel;
    realModel = Card.find(this.getRealId(cardId));
    cardModel = Card.create({
      id: cardId,
      image_url: realModel.image_url,
      name: realModel.name,
      deck: realModel.deckId,
      areaId: this.targetPlayer.deckController.item.id,
      controller: null
    });
    return this.onCreateCard(cardModel);
  };

  NetworkInputController.prototype.onCardIsMoved = function(cardId, location) {
    return this.onMoveCard(cardId, location);
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

  NetworkInputController.prototype.getRealId = function(id) {
    if (id[0] === "o") id = id.slice(1, id.length);
    return id;
  };

  return NetworkInputController;

})(InputController);

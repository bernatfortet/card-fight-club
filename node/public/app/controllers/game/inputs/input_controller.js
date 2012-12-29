var InputController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

InputController = (function(_super) {

  __extends(InputController, _super);

  InputController.prototype.targetPlayer = null;

  function InputController() {
    this.onDrawCard = __bind(this.onDrawCard, this);
    this.onViewCardsFromArea = __bind(this.onViewCardsFromArea, this);
    this.onShuffleArea = __bind(this.onShuffleArea, this);
    this.onZoomCardOut = __bind(this.onZoomCardOut, this);
    this.onZoomCardIn = __bind(this.onZoomCardIn, this);
    this.onCardChangesArea = __bind(this.onCardChangesArea, this);
    this.onCreateCard = __bind(this.onCreateCard, this);    InputController.__super__.constructor.apply(this, arguments);
  }

  InputController.prototype.setTargetPlayer = function(targetPlayer) {
    return this.targetPlayer = targetPlayer;
  };

  InputController.prototype.onCreateCard = function(card) {
    return this.targetPlayer.addCard(card);
  };

  InputController.prototype.onMoveCard = function(cardId, location) {
    return this.targetPlayer.moveCard(Card.find(cardId), location);
  };

  InputController.prototype.onTapCard = function(cardId) {
    return this.targetPlayer.tapCard(Card.find(cardId));
  };

  InputController.prototype.onFlipCard = function(cardId) {
    return this.targetPlayer.flipCard(Card.find(cardId));
  };

  InputController.prototype.onFlipCardUp = function(cardId) {
    return this.targetPlayer.flipCardUp(Card.find(cardId));
  };

  InputController.prototype.onFlipCardDown = function(cardId) {
    return this.targetPlayer.flipCardDown(Card.find(cardId));
  };

  InputController.prototype.onCardChangesArea = function(cardId, areaId) {
    return this.targetPlayer.onCardChangesArea(Card.find(cardId), areaId);
  };

  InputController.prototype.onZoomCardIn = function(cardId) {
    return app.gameController.zoomedCardController.zoomIn(Card.find(cardId));
  };

  InputController.prototype.onZoomCardOut = function() {
    return app.gameController.zoomedCardController.zoomOut();
  };

  InputController.prototype.onShuffleArea = function(key, opt) {
    var areaId;
    areaId = opt.$trigger.data().areaId;
    return this.targetPlayer.shuffleArea(areaId);
  };

  InputController.prototype.onViewCardsFromArea = function(key, opt) {
    var areaId;
    areaId = opt.$trigger.data().areaId;
    return this.targetPlayer.showCardsFromArea(areaId);
  };

  InputController.prototype.onDrawCard = function() {
    return this.targetPlayer.onDrawCard();
  };

  return InputController;

})(Spine.Controller);
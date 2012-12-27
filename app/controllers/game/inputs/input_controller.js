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
    this.onCardGoesToArea = __bind(this.onCardGoesToArea, this);    InputController.__super__.constructor.apply(this, arguments);
  }

  InputController.prototype.setTargetPlayer = function(targetPlayer) {
    return this.targetPlayer = targetPlayer;
  };

  InputController.prototype.onCardIsMoved = function(cardId, position) {
    return this.targetPlayer.moveCard(Card.find(cardId), position);
  };

  InputController.prototype.onCardIsTapped = function(cardId) {
    return this.targetPlayer.tapCard(Card.find(cardId));
  };

  InputController.prototype.onCardIsFlipped = function(cardId) {
    return this.targetPlayer.flipCard(Card.find(cardId));
  };

  InputController.prototype.onCardGoesToArea = function(cardId, areaId) {
    return this.targetPlayer.onCardGoesToArea(Card.find(cardId), areaId);
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

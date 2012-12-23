var InputController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

InputController = (function(_super) {

  __extends(InputController, _super);

  InputController.prototype.targetPlayer = null;

  function InputController() {
    InputController.__super__.constructor.apply(this, arguments);
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

  return InputController;

})(Spine.Controller);

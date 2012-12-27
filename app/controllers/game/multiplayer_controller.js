var MultiplayerController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

MultiplayerController = (function(_super) {

  __extends(MultiplayerController, _super);

  function MultiplayerController() {
    MultiplayerController.__super__.constructor.apply(this, arguments);
  }

  MultiplayerController.prototype.onCreateCard = function(card) {
    return console.log("Card is Created", card);
  };

  MultiplayerController.prototype.onShuffle = function(area) {
    return console.log("Area has shuffled ", area.name, area.id);
  };

  MultiplayerController.prototype.onMoveCard = function(card) {
    return console.log("Card has moved ", card.controller.getLocation());
  };

  MultiplayerController.prototype.onCardChangesArea = function(area) {
    return console.log("Card has changed area ", area.name, area.id);
  };

  MultiplayerController.prototype.sendEvent = function() {};

  return MultiplayerController;

})(Spine.Controller);

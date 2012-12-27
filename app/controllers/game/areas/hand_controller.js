var HandController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

HandController = (function(_super) {

  __extends(HandController, _super);

  function HandController() {
    HandController.__super__.constructor.apply(this, arguments);
  }

  HandController.prototype.onCardDrops = function(card) {
    this.player.flipCardUp(card);
    return this.onZoomCardIn(card.id);
  };

  return HandController;

})(AreaController);

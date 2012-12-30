var GraveyardController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

GraveyardController = (function(_super) {

  __extends(GraveyardController, _super);

  function GraveyardController() {
    GraveyardController.__super__.constructor.apply(this, arguments);
  }

  GraveyardController.prototype.onCardDrops = function(cardModel) {
    return this.player.removeCard(cardModel);
  };

  return GraveyardController;

})(AreaController);

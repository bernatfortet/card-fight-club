var AreaController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

AreaController = (function(_super) {

  __extends(AreaController, _super);

  AreaController.prototype.player = null;

  function AreaController() {
    AreaController.__super__.constructor.apply(this, arguments);
  }

  AreaController.prototype.setItem = function(areaModel) {
    this.item = areaModel;
    return this.el.data().areaId = areaModel.id;
  };

  AreaController.prototype.addCard = function(card) {
    return this.item.addCard(card);
  };

  AreaController.prototype.removeCard = function(card) {
    return this.item.removeCard(card);
  };

  AreaController.prototype.checkCardsEmpty = function() {
    if (this.item.isEmpty()) {
      return this.el.attr("data-isEmpty", true);
    } else {
      return this.el.attr("data-isEmpty", false);
    }
  };

  AreaController.prototype.onCardDrops = function(card) {};

  return AreaController;

})(Spine.Controller);

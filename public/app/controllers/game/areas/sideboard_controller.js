var SideboardController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

SideboardController = (function(_super) {

  __extends(SideboardController, _super);

  function SideboardController() {
    SideboardController.__super__.constructor.apply(this, arguments);
  }

  SideboardController.prototype.onCardDrops = function(card) {};

  return SideboardController;

})(AreaController);

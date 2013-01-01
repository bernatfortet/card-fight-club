var AreaController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

AreaController = (function(_super) {

  __extends(AreaController, _super);

  AreaController.prototype.player = null;

  AreaController.prototype.isTopCardRevealed = false;

  function AreaController() {
    AreaController.__super__.constructor.apply(this, arguments);
  }

  AreaController.prototype.setItem = function(areaModel) {
    this.item = areaModel;
    return this.el.data().areaId = areaModel.id;
  };

  AreaController.prototype.addCard = function(cardModel) {
    this.item.addCard(cardModel);
    return this.checkCardsEmpty();
  };

  AreaController.prototype.removeCard = function(cardModel) {
    this.item.removeCard(cardModel);
    this.player.zoomCardOut();
    return this.checkCardsEmpty();
  };

  AreaController.prototype.toggleRevealTopCard = function(cardModel) {
    if (this.isTopCardRevealed) {
      this.el.css("background-image", 'url("../images/back.jpg")');
      return this.isTopCardRevealed = false;
    } else {
      this.el.css("background-image", 'url("' + cardModel.image_url + '")');
      return this.isTopCardRevealed = true;
    }
  };

  AreaController.prototype.checkCardsEmpty = function() {
    if (this.item.isEmpty()) {
      return this.el.attr("data-isEmpty", true);
    } else {
      return this.el.attr("data-isEmpty", false);
    }
  };

  AreaController.prototype.onCardDrops = function(card) {};

  AreaController.prototype.onDrawCard = function() {
    if (this.isTopCardRevealed) {
      return this.player.toogleRevealTopCardFromArea(this.item);
    }
  };

  AreaController.prototype.onMouseOver = function() {
    if (this.isTopCardRevealed) {
      return this.player.zoomCardIn(this.item.getTopCard());
    }
  };

  AreaController.prototype.onMouseOut = function() {
    if (this.isTopCardRevealed) return this.player.zoomCardOut();
  };

  return AreaController;

})(Spine.Controller);

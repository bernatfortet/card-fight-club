var DeckController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

DeckController = (function(_super) {

  __extends(DeckController, _super);

  DeckController.prototype.deck = null;

  function DeckController() {
    DeckController.__super__.constructor.apply(this, arguments);
  }

  DeckController.prototype.addCard = function(cardModel, targetArea) {
    this.item.addCard(cardModel, targetArea);
    return this.checkCardsEmpty();
  };

  DeckController.prototype.removeCard = function(cardModel) {
    this.item.removeCard(cardModel);
    return this.checkCardsEmpty();
  };

  DeckController.prototype.onCardDrops = function(cardModel) {
    this.player.flipCardDown(cardModel);
    return this.player.removeCard(cardModel);
  };

  DeckController.prototype.onDrawCard = function() {
    if (this.isTopCardRevealed) {
      return this.player.toogleRevealTopCardFromArea(this.item);
    }
  };

  return DeckController;

})(AreaController);

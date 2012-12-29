var DeckController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

DeckController = (function(_super) {

  __extends(DeckController, _super);

  DeckController.prototype.deck = null;

  function DeckController() {
    DeckController.__super__.constructor.apply(this, arguments);
  }

  DeckController.prototype.addCard = function(card, targetArea) {
    this.item.addCard(card, targetArea);
    if (card.controller !== null) {
      card.controller.el.remove();
      card.controller = null;
    }
    return this.checkCardsEmpty();
  };

  DeckController.prototype.removeCard = function(card) {
    this.item.removeCard(card);
    return this.checkCardsEmpty();
  };

  DeckController.prototype.onCardDrops = function(card) {
    return this.player.flipCardDown(card);
  };

  return DeckController;

})(AreaController);

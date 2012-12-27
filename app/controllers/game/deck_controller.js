var DeckController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

DeckController = (function(_super) {

  __extends(DeckController, _super);

  function DeckController() {
    DeckController.__super__.constructor.apply(this, arguments);
  }

  DeckController.prototype.addCardToArea = function(card, targetArea) {
    switch (targetArea) {
      case "deck":
        this.item.addCardToArea(card, targetArea);
        return this.checkDeckCards();
      case "hand":
        return this.item.addCardToArea(card, targetArea);
      case "board":
        return this.item.addCardToArea(card, targetArea);
      case "graveyard":
        return this.item.addCardToArea(card, targetArea);
    }
  };

  DeckController.prototype.removeCardFromArea = function(card, area) {
    switch (area) {
      case "deck":
        this.item.removeCardFromArea(card, area);
        return this.checkDeckCards();
      case "hand":
        return this.item.removeCardFromArea(card, area);
      case "board":
        return this.item.removeCardFromArea(card, area);
      case "graveyard":
        return this.item.removeCardFromArea(card, area);
    }
  };

  DeckController.prototype.checkDeckCards = function() {
    if (this.item.isDeckEmpty()) {
      return this.el.attr("data-isEmpty", true);
    } else {
      return this.el.attr("data-isEmpty", false);
    }
  };

  return DeckController;

})(Spine.Controller);

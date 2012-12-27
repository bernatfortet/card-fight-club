var Card,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Card = (function(_super) {

  __extends(Card, _super);

  function Card() {
    Card.__super__.constructor.apply(this, arguments);
  }

  Card.configure('Card', 'id', 'card_id', "img", "name", "deck", "area", "controller");

  Card.include({
    setArea: function(targetArea) {
      this.deck.controller.removeCardFromArea(this, this.area);
      this.area = targetArea;
      this.deck.controller.addCardToArea(this, targetArea);
      return this.save();
    },
    setController: function(cardController) {
      this.controller = cardController;
      return this.save();
    },
    canBeTapped: function() {
      return this.isOnBoard;
    },
    isOnBoard: function() {
      return this.area === "board";
    },
    isOnDeck: function() {
      return this.area === "deck";
    },
    isOnHand: function() {
      return this.area === "hand";
    },
    isOnGraveyard: function() {
      return this.area === "graveyard";
    }
  });

  return Card;

})(Spine.Model);

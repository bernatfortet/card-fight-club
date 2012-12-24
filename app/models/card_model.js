var Card,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Card = (function(_super) {

  __extends(Card, _super);

  function Card() {
    Card.__super__.constructor.apply(this, arguments);
  }

  Card.configure('Card', 'id', "img_id", "deck_id", "area", "controller");

  Card.include({
    setArea: function(area) {
      this.area = area;
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

var Card,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Card = (function(_super) {

  __extends(Card, _super);

  function Card() {
    Card.__super__.constructor.apply(this, arguments);
  }

  Card.configure('Card', 'id', 'card_id', "img", "name", "deck", "areaId", "controller");

  Card.include({
    setArea: function(areaId) {
      Area.find(this.areaId).controller.removeCard(this);
      this.areaId = areaId;
      Area.find(this.areaId).controller.addCard(this);
      return this.save();
    },
    setController: function(cardController) {
      this.controller = cardController;
      return this.save();
    }
  });

  return Card;

})(Spine.Model);

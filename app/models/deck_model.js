var Deck,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Deck = (function(_super) {

  __extends(Deck, _super);

  function Deck() {
    Deck.__super__.constructor.apply(this, arguments);
  }

  Deck.configure('Deck', 'id', 'name', 'baseCards', 'controller');

  Deck.include({
    createCard: function(cardId) {
      var cardModel, realCardModel;
      realCardModel = UserCard.find(cardId);
      cardModel = Card.create({
        card_id: realCardModel.id,
        image_url: realCardModel.data.image_url,
        name: realCardModel.data.name,
        deck: this,
        areaId: this.controller.item.id,
        controller: null
      });
      return this.controller.addCard(cardModel);
    }
  });

  return Deck;

})(Spine.Model);

Deck.bind("create", function(deck) {
  var cardIndex, _results;
  _results = [];
  for (cardIndex in deck.baseCards) {
    _results.push(deck.createCard(deck.baseCards[cardIndex]));
  }
  return _results;
});

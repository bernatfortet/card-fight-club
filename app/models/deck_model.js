var Deck,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Deck = (function(_super) {

  __extends(Deck, _super);

  function Deck() {
    Deck.__super__.constructor.apply(this, arguments);
  }

  Deck.configure('Deck', 'id', 'name', 'cards', 'controller');

  Deck.include({
    createCard: function(realCardId, image_url, name) {
      var cardModel;
      cardModel = Card.create({
        card_id: realCardId,
        image_url: image_url,
        name: name,
        deckId: this.id,
        areaId: this.controller.item.id,
        controller: null
      });
      return this.controller.addCard(cardModel);
    },
    createOponentCard: function(cardId, image_url, name) {
      var cardModel;
      cardModel = Card.create({
        id: cardId,
        image_url: image_url,
        name: name,
        deckId: this.id,
        areaId: this.controller.item.id,
        controller: null
      });
      return this.controller.addCard(cardModel);
    }
  });

  return Deck;

})(Spine.Model);

Deck.bind("create", function(deck) {
  var card, cardId, cardIndex, realCardModel, _results, _results2;
  if (typeof deck.cards[0] === "string") {
    _results = [];
    for (cardIndex in deck.cards) {
      cardId = deck.cards[cardIndex];
      realCardModel = UserCard.find(cardId);
      _results.push(deck.createCard(realCardModel.id, realCardModel.data.image_url, realCardModel.data.name));
    }
    return _results;
  } else {
    _results2 = [];
    for (cardIndex in deck.cards) {
      card = deck.cards[cardIndex];
      _results2.push(deck.createOponentCard(card.id, card.image_url, card.name));
    }
    return _results2;
  }
});

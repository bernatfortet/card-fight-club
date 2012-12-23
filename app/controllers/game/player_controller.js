var PlayerController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

PlayerController = (function(_super) {

  __extends(PlayerController, _super);

  function PlayerController(deck) {
    PlayerController.__super__.constructor.apply(this, arguments);
  }

  PlayerController.prototype.setDeck = function() {
    var card, _i, _len, _ref, _results;
    console.log("setting Deck");
    _ref = this.deck.baseCards;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card = _ref[_i];
      _results.push(this.addCard());
    }
    return _results;
  };

  PlayerController.prototype.drawCard = function() {
    return console.log("draw Card");
  };

  PlayerController.prototype.addCard = function() {
    var cardController, cardModel, card_item;
    card_item = this.deck.getTopCard();
    cardModel = Card.create({
      id: card_item,
      img_id: card_item,
      deck_id: 1,
      area: null,
      controller: null
    });
    cardController = new CardController({
      item: cardModel
    });
    return this.el.find(".Cards").append(cardController.el);
  };

  PlayerController.prototype.moveCard = function(card, posX, posY) {
    return card.controller.move(posX, posY);
  };

  PlayerController.prototype.tapCard = function(card) {
    return card.controller.tap();
  };

  PlayerController.prototype.flipCard = function(card) {
    return card.controller.flip();
  };

  PlayerController.prototype.getCardPercentPosX = function(card) {};

  return PlayerController;

})(Spine.Controller);

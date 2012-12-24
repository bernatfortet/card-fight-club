var PlayerController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

PlayerController = (function(_super) {

  __extends(PlayerController, _super);

  PlayerController.prototype.deck = null;

  function PlayerController(deck) {
    PlayerController.__super__.constructor.apply(this, arguments);
  }

  PlayerController.prototype.setDeck = function() {
    var card, _ref, _results;
    _results = [];
    for (card = _ref = this.deck.cards.Count() - 1; _ref <= 0 ? card <= 0 : card >= 0; _ref <= 0 ? card++ : card--) {
      _results.push(this.addCard(card));
    }
    return _results;
  };

  PlayerController.prototype.drawCard = function() {
    return console.log("draw Card");
  };

  PlayerController.prototype.addCard = function(cardNumber) {
    var cardController, cardModel;
    cardModel = Card.create({
      img_id: this.deck.cards.Get(cardNumber),
      deck_id: 1,
      area: "deck",
      controller: null
    });
    cardController = new CardController({
      item: cardModel
    });
    this.el.find(".Cards").append(cardController.el);
    return cardController.moveToDeck();
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

  PlayerController.prototype.flipCardUp = function(card) {
    return card.controller.flipUp();
  };

  PlayerController.prototype.flipCardDown = function(card) {
    return card.controller.flipDown();
  };

  PlayerController.prototype.onCardGoesToHand = function(card) {
    if (card.area !== "hand") return this.onCardChangesArea(card, "hand");
  };

  PlayerController.prototype.onCardGoesToDeck = function(card) {
    if (card.area !== "deck") return this.onCardChangesArea(card, "deck");
  };

  PlayerController.prototype.onCardGoesToBoard = function(card) {
    if (card.area !== "board") return this.onCardChangesArea(card, "board");
  };

  PlayerController.prototype.onCardGoesToGraveyard = function(card) {
    if (card.area !== "graveyard") {
      return this.onCardChangesArea(card, "graveyard");
    }
  };

  PlayerController.prototype.onCardChangesArea = function(card, area) {
    if (card.area !== area) {
      if (card.area === "deck" && (area === "hand" || area === "graveyard" || area === "board")) {
        this.deck.getTopCard();
      }
      if (area === "deck") this.deck.putCardOnTop(card);
      return card.setArea(area);
    }
  };

  return PlayerController;

})(Spine.Controller);

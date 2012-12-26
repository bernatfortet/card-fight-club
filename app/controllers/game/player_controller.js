var PlayerController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

PlayerController = (function(_super) {

  __extends(PlayerController, _super);

  PlayerController.prototype.deck = null;

  function PlayerController() {
    PlayerController.__super__.constructor.apply(this, arguments);
  }

  PlayerController.prototype.setDeck = function(deck) {
    return this.deck = Deck.create({
      name: deck.name,
      baseCards: deck.cardList
    });
  };

  PlayerController.prototype.createCardFromTopOfDeck = function() {
    var topCard;
    topCard = this.deck.getTopCard();
    if (topCard) return this.addCard(topCard);
  };

  PlayerController.prototype.addCard = function(card) {
    var cardController;
    cardController = new CardController({
      item: card
    });
    this.el.find(".Cards").append(cardController.el);
    app.gameController.humanInputController.setCardListeners(cardController.el);
    cardController.moveToHand();
    return this.flipCardUp(card);
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
    if (this.checkIfCardComesFromSameArea(card.area, "hand")) {
      return card.setArea("hand");
    }
  };

  PlayerController.prototype.onCardGoesToDeck = function(card) {
    if (this.checkIfCardComesFromSameArea(card.area, "deck")) {
      this.deck.putCardOnTop(card);
      return card.setArea("deck");
    }
  };

  PlayerController.prototype.onCardGoesToBoard = function(card) {
    if (this.checkIfCardComesFromSameArea(card.area, "board")) {
      return card.setArea("board");
    }
  };

  PlayerController.prototype.onCardGoesToGraveyard = function(card) {
    if (this.checkIfCardComesFromSameArea(card.area, "graveyard")) {
      return card.setArea("graveyard");
    }
  };

  PlayerController.prototype.checkIfCardComesFromSameArea = function(originArea, targetArea) {
    if (originArea !== targetArea) {
      return true;
    } else {
      return false;
    }
  };

  PlayerController.prototype.onDrawCard = function() {
    return this.createCardFromTopOfDeck();
  };

  return PlayerController;

})(Spine.Controller);

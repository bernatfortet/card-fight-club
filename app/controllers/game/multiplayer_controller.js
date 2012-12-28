var MultiplayerController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

MultiplayerController = (function(_super) {

  __extends(MultiplayerController, _super);

  MultiplayerController.prototype.server = null;

  MultiplayerController.prototype.local = true;

  function MultiplayerController() {
    MultiplayerController.__super__.constructor.apply(this, arguments);
  }

  MultiplayerController.prototype.onCreateDeck = function(deckModel) {
    var cards, deckData, iCounter,
      _this = this;
    cards = new Object;
    iCounter = 0;
    Card.each(function(card) {
      if (card.deckId === deckModel.id) {
        cards[iCounter] = {
          id: _this.setIdForOpponent(card.id),
          card_id: card.card_id,
          image_url: card.image_url,
          name: card.name
        };
        return iCounter++;
      }
    });
    deckData = {
      id: this.setIdForOpponent(deckModel.id),
      name: deckModel.name,
      cards: cards
    };
    this.sendEvent("onCreateDeck", deckData);
    if (this.local) {
      app.gameController.networkInputController.onDeckIsCreated(deckData);
    }
    return console.log("Deck is Created", deckData);
  };

  MultiplayerController.prototype.onCreateCard = function(cardModel) {
    var cardId;
    this.sendEvent("onCreateCard", cardModel);
    cardId = this.setIdForOpponent(cardModel.id);
    if (this.local) {
      app.gameController.networkInputController.onCardIsCreated(cardId);
    }
    return console.log("Card is Created", cardModel);
  };

  MultiplayerController.prototype.onShuffle = function(area) {
    return console.log("Area has shuffled ", area.name, area.id);
  };

  MultiplayerController.prototype.onMoveCard = function(cardModel) {
    var invertedLocation, opponentCardId;
    invertedLocation = cardModel.controller.getLocation();
    invertedLocation.y = 1 - invertedLocation.y;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    this.sendEvent("onMoveCard", opponentCardId, invertedLocation);
    app.gameController.networkInputController.onCardIsMoved(opponentCardId, invertedLocation);
    return console.log("Card has moved ", opponentCardId);
  };

  MultiplayerController.prototype.onCardChangesArea = function(area) {
    this.sendEvent("onMoveCard", area);
    return console.log("Card has changed area ", area.name, area.id);
  };

  MultiplayerController.prototype.onTapCard = function(cardModel) {
    var opponentCardId;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    this.sendEvent("onTapCard", opponentCardId);
    app.gameController.networkInputController.onCardIsTapped(opponentCardId);
    return console.log("Card has tapped ", opponentCardId);
  };

  MultiplayerController.prototype.onFlipCardUp = function(cardModel) {
    var opponentCardId;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    this.sendEvent("onFlipCardUp", opponentCardId);
    app.gameController.networkInputController.onCardIsFlippedUp(opponentCardId);
    return console.log("Card has flipped Up ", opponentCardId);
  };

  MultiplayerController.prototype.onFlipCardDown = function(cardModel) {
    var opponentCardId;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    this.sendEvent("onFlipCardDown", opponentCardId);
    app.gameController.networkInputController.onCardIsFlippedDown(opponentCardId);
    return console.log("Card has flipped Down ", opponentCardId);
  };

  MultiplayerController.prototype.setIdForOpponent = function(id) {
    if (id[0] !== "o") id = "o".concat(id);
    return id;
  };

  MultiplayerController.prototype.sendEvent = function(event, params) {};

  return MultiplayerController;

})(Spine.Controller);

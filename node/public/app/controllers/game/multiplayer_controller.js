var MultiplayerController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

MultiplayerController = (function(_super) {

  __extends(MultiplayerController, _super);

  MultiplayerController.prototype.server = null;

  MultiplayerController.prototype.local = true;

  function MultiplayerController() {
    MultiplayerController.__super__.constructor.apply(this, arguments);
    this.server = io.connect('http:localhost:8080');
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
    cardId = this.setIdForOpponent(cardModel.id);
    this.sendEvent("onCreateCard", cardId);
    if (this.local) {
      app.gameController.networkInputController.onCardIsCreated(cardId);
    }
    return console.log("Card is Created", cardModel);
  };

  MultiplayerController.prototype.onRemoveCard = function(cardModel) {
    var opponentCardId;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    this.sendEvent("onRemoveCard", opponentCardId);
    if (this.local) {
      app.gameController.networkInputController.onCardIsRemoved(opponentCardId);
    }
    return console.log("Card has been Removed ", opponentCardId);
  };

  MultiplayerController.prototype.onMoveCard = function(cardModel) {
    var invertedLocation, opponentCardId, params;
    invertedLocation = cardModel.controller.getLocation();
    invertedLocation.y = 1 - invertedLocation.y;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: opponentCardId,
      location: invertedLocation
    };
    this.sendEvent("onMoveCard", params);
    if (this.local) {
      app.gameController.networkInputController.onCardIsMoved(params);
    }
    return console.log("Card has moved ", opponentCardId);
  };

  MultiplayerController.prototype.onCardChangesArea = function(cardModel, areaModel) {
    var opponentCardId, params;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: opponentCardId,
      areaName: areaModel.name
    };
    this.sendEvent("onCardChangesArea", params);
    if (this.local) {
      app.gameController.networkInputController.onCardAreaIsChanged(params);
    }
    return console.log("Card has changed area ", params);
  };

  MultiplayerController.prototype.onTapCard = function(cardModel) {
    var opponentCardId;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    this.sendEvent("onTapCard", opponentCardId);
    if (this.local) {
      app.gameController.networkInputController.onCardIsTapped(opponentCardId);
    }
    return console.log("Card has tapped ", opponentCardId);
  };

  MultiplayerController.prototype.onFlipCardUp = function(cardModel) {
    var opponentCardId;
    if (Area.find(cardModel.areaId).name === "hand") return;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    this.sendEvent("onFlipCardUp", opponentCardId);
    if (this.local) {
      app.gameController.networkInputController.onCardIsFlippedUp(opponentCardId);
    }
    return console.log("Card has flipped Up ", opponentCardId);
  };

  MultiplayerController.prototype.onFlipCardDown = function(cardModel) {
    var opponentCardId;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    this.sendEvent("onFlipCardDown", opponentCardId);
    if (this.local) {
      app.gameController.networkInputController.onCardIsFlippedDown(opponentCardId);
    }
    return console.log("Card has flipped Down ", opponentCardId);
  };

  MultiplayerController.prototype.onShuffle = function(area) {
    return console.log("Area has shuffled ", area.name, area.id);
  };

  MultiplayerController.prototype.setIdForOpponent = function(id) {
    if (id[0] !== "o") id = "o".concat(id);
    return id;
  };

  MultiplayerController.prototype.sendEvent = function(event, params) {
    if (!this.local) return this.server.emit(event, params);
  };

  return MultiplayerController;

})(Spine.Controller);

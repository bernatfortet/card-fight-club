var MultiplayerController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

MultiplayerController = (function(_super) {

  __extends(MultiplayerController, _super);

  MultiplayerController.prototype.server = null;

  MultiplayerController.prototype.local = false;

  function MultiplayerController() {
    this.onSetCounter = __bind(this.onSetCounter, this);
    this.onMoveCounter = __bind(this.onMoveCounter, this);
    this.onRemoveCounter = __bind(this.onRemoveCounter, this);
    this.onCreateCounter = __bind(this.onCreateCounter, this);    MultiplayerController.__super__.constructor.apply(this, arguments);
    this.server = io.connect('http:' + serverIp + ':8080');
  }

  MultiplayerController.prototype.onCreateDeck = function(deckModel) {
    var cards, iCounter, params,
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
    params = {
      id: this.setIdForOpponent(deckModel.id),
      name: deckModel.name,
      cards: cards
    };
    this.sendEvent("onCreateDeck", params);
    if (localServer) {
      app.gameController.networkInputController.onDeckIsCreated(params);
    }
    return console.log("Deck is Created", params);
  };

  MultiplayerController.prototype.onCreateCard = function(cardModel) {
    var cardId, params;
    cardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: cardId,
      image_url: cardModel.image_url,
      name: cardModel.name
    };
    this.sendEvent("onCreateCard", params);
    if (localServer) {
      app.gameController.networkInputController.onCardIsCreated(params);
    }
    return console.log("Card is Created", params);
  };

  MultiplayerController.prototype.onRemoveCard = function(cardModel) {
    var opponentCardId, params;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: opponentCardId
    };
    this.sendEvent("onRemoveCard", params);
    if (localServer) {
      app.gameController.networkInputController.onCardIsRemoved(params);
    }
    return console.log("Card has been Removed ", params);
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
    if (localServer) {
      app.gameController.networkInputController.onCardIsMoved(params);
    }
    return console.log("Card has moved ", opponentCardId);
  };

  MultiplayerController.prototype.onCardChangesArea = function(cardModel, areaModel) {
    var opponentCardId, params;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: opponentCardId,
      previousAreaName: Area.find(cardModel.previousAreaId).name,
      areaName: areaModel.name
    };
    this.sendEvent("onCardChangesArea", params);
    if (localServer) {
      app.gameController.networkInputController.onCardAreaIsChanged(params);
    }
    return console.log("Card has changed area ", params);
  };

  MultiplayerController.prototype.onTapCard = function(cardModel) {
    var opponentCardId, params;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: opponentCardId
    };
    this.sendEvent("onTapCard", params);
    if (localServer) {
      app.gameController.networkInputController.onCardIsTapped(params);
    }
    return console.log("Card has tapped ", params);
  };

  MultiplayerController.prototype.onUntapCard = function(cardModel) {
    var opponentCardId, params;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: opponentCardId
    };
    this.sendEvent("onUntapCard", params);
    if (localServer) {
      app.gameController.networkInputController.onCardIsUntapped(params);
    }
    return console.log("Card has untapped ", params);
  };

  MultiplayerController.prototype.onFlipCardUp = function(cardModel) {
    var opponentCardId, params;
    if (Area.find(cardModel.areaId).name === "hand") return;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: opponentCardId
    };
    this.sendEvent("onFlipCardUp", params);
    if (localServer) {
      app.gameController.networkInputController.onCardIsFlippedUp(params);
    }
    return console.log("Card has flipped Up ", params);
  };

  MultiplayerController.prototype.onFlipCardDown = function(cardModel) {
    var opponentCardId, params;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: opponentCardId
    };
    this.sendEvent("onFlipCardDown", params);
    if (localServer) {
      app.gameController.networkInputController.onCardIsFlippedDown(params);
    }
    return console.log("Card has flipped Down ", params);
  };

  MultiplayerController.prototype.onShuffle = function(area) {
    return console.log("Area has shuffled ", area.name, area.id);
  };

  MultiplayerController.prototype.onToggleRevealCardFromArea = function(cardModel, areaModel) {
    var opponentCardId, params;
    opponentCardId = this.setIdForOpponent(cardModel.id);
    params = {
      cardId: opponentCardId,
      areaName: areaModel.name
    };
    this.sendEvent("onToggleRevealCardFromArea", params);
    if (localServer) {
      app.gameController.networkInputController.onCardFromAreaIsRevealedToggle(params);
    }
    return console.log("Area has revealed top card ", params);
  };

  MultiplayerController.prototype.onSendChatMsg = function(msg) {
    var params;
    params = {
      userName: User.first().name,
      msg: msg
    };
    this.sendEvent("onSendChatMsg", params);
    if (localServer) {
      app.gameController.networkInputController.onChatMsgIsReceived(params);
    }
    return console.log("Player says:  ", params);
  };

  MultiplayerController.prototype.onPassTurn = function() {
    var params;
    params = {};
    this.sendEvent("onPassTurn", params);
    if (localServer) {
      app.gameController.networkInputController.onTurnIsReceived(params);
    }
    return console.log("Player Passes Turn  ");
  };

  MultiplayerController.prototype.onThrowDice = function(diceResult) {
    var params;
    params = {
      diceResult: diceResult
    };
    this.sendEvent("onThrowDice", params);
    if (localServer) {
      app.gameController.networkInputController.onDiceIsThrown(params);
    }
    return console.log("Player Throws Dice ", diceResult);
  };

  MultiplayerController.prototype.onCreateCounter = function(counterModel) {
    var counterId, params;
    counterId = this.setIdForOpponent(counterModel.id);
    params = {
      counterId: counterId,
      attached_card_id: counterModel.attachedCardId != null
    };
    this.sendEvent("onCreateCounter", params);
    if (localServer) {
      app.gameController.networkInputController.onCounterIsCreated(params);
    }
    return console.log("Counter is Created", params);
  };

  MultiplayerController.prototype.onRemoveCounter = function(counterModel) {
    var opponentCounterId, params;
    opponentCounterId = this.setIdForOpponent(counterModel.id);
    params = {
      counterId: opponentCounterId
    };
    this.sendEvent("onRemoveCounter", params);
    if (localServer) {
      app.gameController.networkInputController.onCounterIsRemoved(params);
    }
    return console.log("Card has been Removed ", params);
  };

  MultiplayerController.prototype.onMoveCounter = function(counterModel) {
    var invertedLocation, opponentCounterId, params;
    invertedLocation = counterModel.controller.getLocation();
    invertedLocation.y = 1 - invertedLocation.y;
    opponentCounterId = this.setIdForOpponent(counterModel.id);
    params = {
      counterId: opponentCounterId,
      location: invertedLocation
    };
    this.sendEvent("onMoveCounter", params);
    if (localServer) {
      app.gameController.networkInputController.onCounterIsMoved(params);
    }
    return console.log("Counter has moved ", opponentCounterId);
  };

  MultiplayerController.prototype.onSetCounter = function(counterModel) {
    var opponentCounterId, params;
    opponentCounterId = this.setIdForOpponent(counterModel.id);
    params = {
      counterId: opponentCounterId,
      counterNumber: counterModel.number
    };
    this.sendEvent("onSetCounter", params);
    if (localServer) {
      app.gameController.networkInputController.onCounterIsSet(params);
    }
    return console.log("Counter has moved ", opponentCounterId);
  };

  MultiplayerController.prototype.setIdForOpponent = function(id) {
    if (id[0] !== "o") id = "o".concat(id);
    return id;
  };

  MultiplayerController.prototype.sendEvent = function(event, params) {
    params.userName = User.first().name;
    if (!localServer) return this.server.emit(event, params);
  };

  return MultiplayerController;

})(Spine.Controller);

var PlayerController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

PlayerController = (function(_super) {

  __extends(PlayerController, _super);

  PlayerController.prototype.deck = null;

  PlayerController.prototype.multiplayerController = null;

  PlayerController.prototype.cardListerController = null;

  function PlayerController() {
    this.unattachCounter = __bind(this.unattachCounter, this);
    this.attachCounterToCard = __bind(this.attachCounterToCard, this);    PlayerController.__super__.constructor.apply(this, arguments);
    this.deckController = new DeckController({
      el: this.el.find(".Deck"),
      player: this
    });
    this.handController = new HandController({
      el: this.el.find(".Hand"),
      player: this
    });
    this.boardController = new BoardController({
      el: this.el.find(".Board"),
      player: this
    });
    this.graveyardController = new GraveyardController({
      el: this.el.find(".Graveyard"),
      player: this
    });
    this.sideboardController = new SideboardController({
      el: this.el.find(".Sideboard"),
      player: this
    });
    this.deckArea = Area.create({
      name: "deck",
      controller: this.deckController
    });
    this.hand = Area.create({
      name: "hand",
      controller: this.handController
    });
    this.board = Area.create({
      name: "board",
      controller: this.boardController
    });
    this.graveyard = Area.create({
      name: "graveyard",
      controller: this.graveyardController
    });
    this.sideboard = Area.create({
      name: "sideboard",
      controller: this.sideboardController
    });
    this.deckArea.setList();
    this.hand.setList();
    this.board.setList();
    this.graveyard.setList();
    this.sideboard.setList();
    this.deckController.setItem(this.deckArea);
    this.handController.setItem(this.hand);
    this.boardController.setItem(this.board);
    this.graveyardController.setItem(this.graveyard);
    this.sideboardController.setItem(this.sideboard);
  }

  PlayerController.prototype.setDeck = function(deck) {
    this.deck = Deck.create({
      name: deck.name,
      cards: deck.cards,
      controller: this.deckController
    });
    this.deckController.deck = this.deck;
    if (this.multiplayerController != null) {
      this.multiplayerController.onCreateDeck(this.deck);
    }
    return this.shuffleArea(this.deckArea.id);
  };

  PlayerController.prototype.onDrawCardFromArea = function(areaModel) {
    this.createCardFromTopOfArea(areaModel);
    return areaModel.controller.onDrawCard();
  };

  PlayerController.prototype.createCardFromTopOfArea = function(areaModel) {
    var topCard;
    topCard = areaModel.getAndRemoveTopCard();
    if (topCard) return this.addCard(topCard);
  };

  PlayerController.prototype.addCard = function(cardModel) {
    var cardController;
    cardController = new CardController({
      item: cardModel
    });
    cardModel.setController(cardController);
    if (this.isPlayerNetworked()) {
      this.multiplayerController.onCreateCard(cardModel);
      this.setCardListeners(cardController.el);
    } else {
      this.setCardHoverListener(cardController.el);
    }
    this.renderCard(cardController.el);
    this.changeCardArea(cardModel, this.hand.id);
    this.moveToAreaLocation(cardModel, this.hand.id);
    this.flipCardUp(cardModel);
    return cardController;
  };

  PlayerController.prototype.removeCard = function(cardModel) {
    cardModel.controller.el.remove();
    cardModel.controller = null;
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onRemoveCard(cardModel);
    }
  };

  PlayerController.prototype.renderCard = function(cardEl) {
    return this.el.find(".Cards").append(cardEl);
  };

  PlayerController.prototype.moveToAreaLocation = function(cardModel, areaId) {
    var areaModel, areaPosX, areaPosY;
    areaModel = Area.find(areaId);
    if (areaModel.name === "hand") {
      areaPosX = this.getCardPositionInHand(areaModel);
    } else {
      areaPosX = areaModel.controller.el.offset().left / $(window).width();
    }
    areaPosY = areaModel.controller.el.offset().top / $(window).height();
    return cardModel.controller.move(areaPosX, areaPosY);
  };

  PlayerController.prototype.getCardPositionInHand = function(areaModel) {
    var areaLeftOffset, areaOuterWidth, cardPosition, cardWidth, cardsInHand;
    cardWidth = 100;
    cardsInHand = areaModel.cards.Count();
    areaLeftOffset = areaModel.controller.el.offset().left;
    areaOuterWidth = areaModel.controller.el.outerWidth();
    cardPosition = areaLeftOffset + (cardsInHand * cardWidth);
    if (cardPosition <= areaOuterWidth) {
      return cardPosition / $(window).width();
    } else {
      return (areaOuterWidth - cardWidth) / $(window).width();
    }
  };

  PlayerController.prototype.moveCard = function(cardModel, location) {
    cardModel.controller.move(location.x, location.y);
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onMoveCard(cardModel);
    }
  };

  PlayerController.prototype.changeCardArea = function(cardModel, areaId) {
    var areaModel;
    areaModel = Area.find(areaId);
    if (!this.checkIfCardComesFromSameArea(cardModel.areaId, areaId)) {
      if (this.isPlayerNetworked()) {
        this.multiplayerController.onCardChangesArea(cardModel, areaModel);
      }
      cardModel.setArea(areaId);
      return areaModel.controller.onCardDrops(cardModel);
    }
  };

  PlayerController.prototype.checkIfCardComesFromSameArea = function(originArea, targetArea) {
    if (originArea === targetArea) {
      return true;
    } else {
      return false;
    }
  };

  PlayerController.prototype.tapCard = function(cardModel) {
    cardModel.controller.tap();
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onTapCard(cardModel);
    }
  };

  PlayerController.prototype.untapCard = function(cardModel) {
    cardModel.controller.untap();
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onUntapCard(cardModel);
    }
  };

  PlayerController.prototype.flipCardUp = function(cardModel) {
    var cardAreaModel;
    cardAreaModel = Area.find(cardModel.areaId);
    if (!this.isPlayerNetworked() && cardAreaModel.name === "hand") return;
    cardModel.controller.flipUp();
    if (this.isPlayerNetworked()) {
      this.multiplayerController.onFlipCardUp(cardModel);
    }
    return app.gameController.soundController.playSound("flipCard");
  };

  PlayerController.prototype.flipCardDown = function(cardModel) {
    cardModel.controller.flipDown();
    if (this.isPlayerNetworked()) {
      this.multiplayerController.onFlipCardDown(cardModel);
    }
    return app.gameController.soundController.playSound("flipCard");
  };

  PlayerController.prototype.zoomCardIn = function(cardModel) {
    return app.gameController.zoomedCardController.zoomIn(cardModel);
  };

  PlayerController.prototype.zoomCardOut = function() {
    return app.gameController.zoomedCardController.zoomOut();
  };

  PlayerController.prototype.shuffleArea = function(areaId) {
    var areaModel;
    areaModel = Area.find(areaId);
    areaModel.shuffle();
    if (this.isPlayerNetworked()) this.multiplayerController.onShuffle(areaModel);
    return app.gameController.soundController.playSound("shuffleDeck");
  };

  PlayerController.prototype.toogleRevealTopCardFromArea = function(areaModel) {
    var cardModel;
    cardModel = areaModel.getTopCard();
    return this.toggleRevealCardFromArea(cardModel, areaModel);
  };

  PlayerController.prototype.toggleRevealCardFromArea = function(cardModel, areaModel) {
    areaModel.controller.toggleRevealTopCard(cardModel);
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onToggleRevealCardFromArea(cardModel, areaModel);
    }
  };

  PlayerController.prototype.showCardsFromArea = function(areaId) {
    return this.cardListerController.showCardsFromArea(Area.find(areaId));
  };

  PlayerController.prototype.passTurn = function() {
    $(".Player").attr("state", "");
    $(".Opponent").attr("state", "Active");
    app.gameController.soundController.playSound("receiveTurn");
    if (this.isPlayerNetworked()) return this.multiplayerController.onPassTurn();
  };

  PlayerController.prototype.receiveTurn = function() {
    $(".Player").attr("state", "");
    this.el.attr("state", "Active");
    return app.gameController.soundController.playSound("receiveTurn");
  };

  PlayerController.prototype.throwDice = function() {
    var diceResult, params;
    diceResult = this.getRandomInt(1, 6);
    params = {
      userName: User.first().name,
      diceResult: diceResult
    };
    app.gameController.chatController.renderThrowDice(params);
    app.gameController.soundController.playSound("throwDice");
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onThrowDice(diceResult);
    }
  };

  PlayerController.prototype.createLifeCounter = function() {
    var counterModel, lifeCounterController;
    counterModel = Counter.create({
      number: 20,
      attached_card_id: null,
      controller: null
    });
    return lifeCounterController = this.addCounter(counterModel);
  };

  PlayerController.prototype.addCounter = function(counterModel) {
    var counterController;
    counterController = new CounterController({
      item: counterModel
    });
    counterModel.setController(counterController);
    this.renderCounter(counterController);
    if (this.isPlayerNetworked()) {
      this.multiplayerController.onCreateCounter(counterModel);
      this.setCounterListeners(counterController);
    }
    return counterController;
  };

  PlayerController.prototype.renderCounter = function(counterController) {
    var isLifeCounter;
    isLifeCounter = counterController.item.number === 20;
    if (!isLifeCounter) {
      return this.el.find(".Counters").append(counterController.el);
    } else {
      counterController.el.remove();
      counterController.el = this.el.find(".LifeCounter");
      counterController.el.attr("data-id", counterController.item.id);
      return counterController.el.find("input").val(counterController.item.number);
    }
  };

  PlayerController.prototype.setCounter = function(counterModel, counterNumber) {
    counterModel.controller.el.find("input").val(counterNumber);
    counterModel.controller.el.find(".number").html(counterNumber);
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onSetCounter(counterModel, counterNumber);
    }
  };

  PlayerController.prototype.removeCounter = function(counterModel) {
    counterModel.controller.el.remove();
    counterModel.controller = null;
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onRemoveCounter(counterModel);
    }
  };

  PlayerController.prototype.moveCounter = function(counterModel, location) {
    counterModel.controller.move(location.x, location.y);
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onMoveCounter(counterModel);
    }
  };

  PlayerController.prototype.attachCounterToCard = function(counterModel, cardModel) {
    counterModel.controller.attachToCard(cardModel.controller);
    cardModel.controller.attachCounter(counterModel.controller);
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onAttachCounterToCard(counterModel, cardModel);
    }
  };

  PlayerController.prototype.unattachCounter = function(counterModel) {
    var cardController;
    if (counterModel.controller.isAttached) {
      cardController = counterModel.controller.cardControllerAttachedTo;
      cardController.unattachCounter(counterModel.controller);
      counterModel.controller.unattach();
      if (this.isPlayerNetworked()) {
        return this.multiplayerController.onUnattachCounter(counterModel);
      }
    }
  };

  PlayerController.prototype.setCardListeners = function(cardElement) {
    return app.gameController.humanInputController.setCardListeners(cardElement);
  };

  PlayerController.prototype.setCounterListeners = function(counterElement) {
    return app.gameController.humanInputController.setCounterListener(counterElement);
  };

  PlayerController.prototype.setCardHoverListener = function(cardEl) {
    return app.gameController.humanInputController.setCardHoverListener(cardEl);
  };

  PlayerController.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  PlayerController.prototype.isPlayerNetworked = function() {
    return this.multiplayerController != null;
  };

  return PlayerController;

})(Spine.Controller);

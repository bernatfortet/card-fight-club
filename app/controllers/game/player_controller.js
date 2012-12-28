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
    var boardController, deckController, graveyardController, handController, sideboardController;
    deckController = new DeckController({
      el: this.el.find(".Deck"),
      player: this
    });
    handController = new BoardController({
      el: this.el.find(".Hand"),
      player: this
    });
    boardController = new BoardController({
      el: this.el.find(".Board"),
      player: this
    });
    graveyardController = new BoardController({
      el: this.el.find(".Graveyard"),
      player: this
    });
    sideboardController = new BoardController({
      el: this.el.find(".Sideboard"),
      player: this
    });
    this.deckArea = Area.create({
      name: "deck",
      controller: deckController
    });
    this.hand = Area.create({
      name: "hand",
      controller: handController
    });
    this.board = Area.create({
      name: "board",
      controller: boardController
    });
    this.graveyard = Area.create({
      name: "graveyard",
      controller: graveyardController
    });
    this.sideboard = Area.create({
      name: "sideboard",
      controller: sideboardController
    });
    this.deckArea.setList();
    this.hand.setList();
    this.board.setList();
    this.graveyard.setList();
    this.sideboard.setList();
    deckController.setItem(this.deckArea);
    handController.setItem(this.hand);
    boardController.setItem(this.board);
    graveyardController.setItem(this.graveyard);
    sideboardController.setItem(this.sideboard);
    this.deck = Deck.create({
      name: deck.name,
      baseCards: deck.cardList,
      controller: deckController
    });
    deckController.deck = this.deck;
    return this.shuffleArea(this.deckArea.id);
  };

  PlayerController.prototype.createCardFromTopOfDeck = function() {
    var topCard;
    topCard = this.deckArea.getTopCard();
    if (topCard) return this.addCard(topCard);
  };

  PlayerController.prototype.addCard = function(card) {
    var cardController;
    cardController = new CardController({
      item: card
    });
    card.setController(cardController);
    this.el.find(".Cards").append(cardController.el);
    app.gameController.humanInputController.setCardListeners(cardController.el);
    cardController.moveToArea(this.hand.id);
    this.flipCardUp(card);
    return app.gameController.multiplayerController.onCreateCard(card);
  };

  PlayerController.prototype.moveCard = function(card, location) {
    return card.controller.move(location.left / $(window).width(), location.top / $(window).height());
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

  PlayerController.prototype.onCardGoesToArea = function(card, areaId) {
    var areaModel;
    areaModel = Area.find(areaId);
    if (!this.checkIfCardComesFromSameArea(card.areaId, areaModel.id)) {
      app.gameController.multiplayerController.onMoveCard(card);
      app.gameController.multiplayerController.onCardChangesArea(areaModel);
      areaModel.controller.onCardDrops(card);
      return card.setArea(areaId);
    } else {
      return app.gameController.multiplayerController.onMoveCard(card);
    }
  };

  PlayerController.prototype.checkIfCardComesFromSameArea = function(originArea, targetArea) {
    if (originArea === targetArea) {
      return true;
    } else {
      return false;
    }
  };

  PlayerController.prototype.shuffleArea = function(areaId) {
    var areaModel;
    areaModel = Area.find(areaId);
    areaModel.shuffle();
    return app.gameController.multiplayerController.onShuffle(areaModel);
  };

  PlayerController.prototype.onDrawCard = function() {
    return this.createCardFromTopOfDeck();
  };

  PlayerController.prototype.showCardsFromArea = function(areaId) {
    return app.gameController.cardListerController.showCardsFromArea(Area.find(areaId));
  };

  return PlayerController;

})(Spine.Controller);

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
      baseCards: deck.cards,
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

  PlayerController.prototype.addCard = function(cardModel) {
    var cardController;
    cardController = new CardController({
      item: cardModel
    });
    cardModel.setController(cardController);
    app.gameController.multiplayerController.onCreateCard(cardModel);
    this.renderCard(cardController.el);
    this.setCardListeners(cardController.el);
    this.moveToAreaLocation(cardModel, this.hand.id);
    this.onCardGoesToArea(cardModel, this.hand.id);
    return this.flipCardUp(cardModel);
  };

  PlayerController.prototype.renderCard = function(cardEl) {
    return this.el.find(".Cards").append(cardEl);
  };

  PlayerController.prototype.setCardListeners = function(cardEl) {
    return app.gameController.humanInputController.setCardListeners(cardEl);
  };

  PlayerController.prototype.moveToAreaLocation = function(cardModel, areaId) {
    var areaModel, areaPosX, areaPosY;
    areaModel = Area.find(areaId);
    areaPosX = areaModel.controller.el.offset().left / $(window).width();
    areaPosY = areaModel.controller.el.offset().top / $(window).height();
    return cardModel.controller.move(areaPosX, areaPosY);
  };

  PlayerController.prototype.moveCard = function(cardModel, location) {
    return cardModel.controller.move(location.left / $(window).width(), location.top / $(window).height());
  };

  PlayerController.prototype.tapCard = function(cardModel) {
    return cardModel.controller.tap();
  };

  PlayerController.prototype.flipCard = function(cardModel) {
    return cardModel.controller.flip();
  };

  PlayerController.prototype.flipCardUp = function(cardModel) {
    return cardModel.controller.flipUp();
  };

  PlayerController.prototype.flipCardDown = function(cardModel) {
    return cardModel.controller.flipDown();
  };

  PlayerController.prototype.onCardGoesToArea = function(cardModel, areaId) {
    var areaModel;
    areaModel = Area.find(areaId);
    if (!this.checkIfCardComesFromSameArea(cardModel.areaId, areaModel.id)) {
      app.gameController.multiplayerController.onMoveCard(cardModel);
      app.gameController.multiplayerController.onCardChangesArea(areaModel);
      areaModel.controller.onCardDrops(cardModel);
      return cardModel.setArea(areaId);
    } else {
      return app.gameController.multiplayerController.onMoveCard(cardModel);
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

var PlayerController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

PlayerController = (function(_super) {

  __extends(PlayerController, _super);

  PlayerController.prototype.deck = null;

  PlayerController.prototype.multiplayerController = null;

  PlayerController.prototype.cardListerController = null;

  function PlayerController() {
    PlayerController.__super__.constructor.apply(this, arguments);
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

  PlayerController.prototype.onDrawCard = function() {
    return this.createCardFromTopOfDeck();
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
    if (this.isPlayerNetworked()) {
      this.multiplayerController.onCreateCard(cardModel);
      this.setCardListeners(cardController.el);
    } else {
      this.setCardHoverListener(cardController.el);
    }
    this.renderCard(cardController.el);
    this.moveToAreaLocation(cardModel, this.hand.id);
    this.changeCardArea(cardModel, this.hand.id);
    return this.flipCardUp(cardModel);
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
    areaPosX = areaModel.controller.el.offset().left / $(window).width();
    areaPosY = areaModel.controller.el.offset().top / $(window).height();
    return cardModel.controller.move(areaPosX, areaPosY);
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
    if (!this.checkIfCardComesFromSameArea(cardModel.areaId, areaModel.id)) {
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

  PlayerController.prototype.flipCardUp = function(cardModel) {
    var cardAreaModel;
    cardAreaModel = Area.find(cardModel.areaId);
    if (!this.isPlayerNetworked() && cardAreaModel.name === "hand") return;
    cardModel.controller.flipUp();
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onFlipCardUp(cardModel);
    }
  };

  PlayerController.prototype.flipCardDown = function(cardModel) {
    cardModel.controller.flipDown();
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onFlipCardDown(cardModel);
    }
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
    if (this.isPlayerNetworked()) {
      return this.multiplayerController.onShuffle(areaModel);
    }
  };

  PlayerController.prototype.showCardsFromArea = function(areaId) {
    return this.cardListerController.showCardsFromArea(Area.find(areaId));
  };

  PlayerController.prototype.setCardListeners = function(cardEl) {
    return app.gameController.humanInputController.setCardListeners(cardEl);
  };

  PlayerController.prototype.setCardHoverListener = function(cardEl) {
    return app.gameController.humanInputController.setCardHoverListener(cardEl);
  };

  PlayerController.prototype.isPlayerNetworked = function() {
    return this.multiplayerController != null;
  };

  return PlayerController;

})(Spine.Controller);

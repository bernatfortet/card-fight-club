var GameController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

GameController = (function(_super) {

  __extends(GameController, _super);

  GameController.prototype.areas = {
    deck: "deck",
    hand: "hand",
    board: "board",
    graveyard: "graveyard"
  };

  function GameController() {
    GameController.__super__.constructor.apply(this, arguments);
    this.setPlayers();
    this.setInputControllers();
    this.zoomedCardController = new ZoomedCardController({
      el: $(".ZoomedCard")
    });
  }

  GameController.prototype.setPlayers = function() {
    this.playerDeck = Deck.create({
      name: "Deck Player",
      baseCards: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 12, 12, 12, 12, 13, 13, 13, 13, 8, 8, 8, 8, 8]
    });
    this.opponentDeck = Deck.create({
      name: "Deck Opponent",
      baseCards: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 12, 12, 12, 12, 13, 13, 13, 13, 8, 8, 8, 8, 8]
    });
    this.player = new PlayerController({
      el: $(".Player"),
      deck: this.playerDeck
    });
    return this.player.setDeck(this.playerDeck);
  };

  GameController.prototype.setInputControllers = function() {
    this.humanInputController = new HumanInputController();
    this.networkInputController = new NetworkInputController();
    this.humanInputController.setTargetPlayer(this.player);
    return this.networkInputController.setTargetPlayer(this.opponent);
  };

  return GameController;

})(Spine.Controller);

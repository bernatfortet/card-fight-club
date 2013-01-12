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
  }

  GameController.prototype.initialize = function() {
    this.multiplayerController = new MultiplayerController();
    this.humanInputController = new HumanInputController();
    this.networkInputController = new NetworkInputController();
    this.chatController = new ChatController({
      el: $(".Chat")
    });
    this.multiplayerController = new MultiplayerController();
    this.zoomedCardController = new ZoomedCardController({
      el: $(".ZoomedCard")
    });
    this.cardListerController = new CardListerController({
      el: $(".CardLister")
    });
    this.player = new PlayerController({
      el: $(".Player"),
      multiplayerController: this.multiplayerController,
      cardListerController: this.cardListerController
    });
    this.opponent = new PlayerController({
      el: $(".opponent")
    });
    this.humanInputController.setTargetPlayer(this.player);
    this.networkInputController.setTargetPlayer(this.opponent);
    this.player.setDeck(User.first().deck);
    return this.humanInputController.setListeners();
  };

  return GameController;

})(Spine.Controller);

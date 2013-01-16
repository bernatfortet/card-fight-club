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
    this.soundController = new SoundController({
      el: $(".Sounds")
    });
    this.multiplayerController = new MultiplayerController();
    this.zoomedCardController = new ZoomedCardController({
      el: $(".ZoomedCard")
    });
    this.cardListerController = new CardListerController({
      el: $(".CardLister")
    });
    this.player = new PlayerController({
      el: $(".HumanPlayer"),
      multiplayerController: this.multiplayerController,
      cardListerController: this.cardListerController
    });
    this.opponent = new PlayerController({
      el: $(".Opponent")
    });
    this.humanInputController.setTargetPlayer(this.player);
    this.networkInputController.setTargetPlayer(this.opponent);
    this.player.setDeck(User.first().deck);
    this.humanInputController.setListeners();
    this.humanInputController.onResize();
    return this.showGameBoard();
  };

  GameController.prototype.reset = function() {
    var card, cardArea, cardOwner, ownerIsPlayer, _i, _len, _ref, _results;
    _ref = Card.all();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card = _ref[_i];
      cardArea = Area.find(card.areaId);
      cardOwner = cardArea.controller.player;
      ownerIsPlayer = cardOwner.el === this.player.el;
      if (card.controller && ownerIsPlayer) {
        _results.push(cardOwner.changeCardArea(card, cardOwner.deckArea.id));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  GameController.prototype.showGameBoard = function() {
    return $("#Game").addClass("active");
  };

  return GameController;

})(Spine.Controller);

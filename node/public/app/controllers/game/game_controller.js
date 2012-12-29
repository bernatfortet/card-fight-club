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
    this.humanInputController = new HumanInputController();
    this.networkInputController = new NetworkInputController();
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

  GameController.prototype.getPlayerInfoOLD = function() {
    return {
      player: {
        name: "Socra",
        deck: {
          deck_id: 1,
          name: "deck1",
          cardList: {
            0: {
              card_id: 1,
              img: "1.jpg",
              name: "name1"
            },
            1: {
              card_id: 2,
              img: "2.jpg",
              name: "name2"
            },
            2: {
              card_id: 3,
              img: "3.jpg",
              name: "name3"
            }
          }
        }
      }
    };
  };

  return GameController;

})(Spine.Controller);

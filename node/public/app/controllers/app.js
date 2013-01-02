var App,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

App = (function(_super) {

  __extends(App, _super);

  App.prototype.userInfo = null;

  function App() {
    App.__super__.constructor.apply(this, arguments);
  }

  App.prototype.initialize = function() {
    this.gameController = new GameController();
    this.dbController = new DBController();
    this.networkController = new NetworkController();
    return this.dbController.getDeckFromMongoLab(this.getDeckid());
  };

  App.prototype.createUser = function(userData, deckData) {
    var randomId;
    randomId = Math.floor(Math.random() * 1000);
    User.create({
      id: randomId,
      name: "pepito",
      deck: deckData
    });
    return this.networkController.onReady();
  };

  App.prototype.startGame = function() {
    return this.gameController.initialize();
  };

  App.prototype.getDeckid = function() {
    var deckId;
    deckId = prompt("Insert Deck Id", "");
    if (deckId === "1") {
      return deckId = "50df4fe8e4b0d84e5fee60ad";
    } else if (deckId === "2") {
      return deckId = "50dcf268e4b0b7b39972bf5f";
    } else if (deckId === "3") {
      return deckId = "50df5072e4b0d84e5fee60b0";
    } else {
      return deckId = "50df4fe8e4b0d84e5fee60ad";
    }
  };

  return App;

})(Spine.Controller);

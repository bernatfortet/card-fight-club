var App,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

App = (function(_super) {

  __extends(App, _super);

  App.prototype.userInfo = null;

  App.prototype.serverIp = "25.175.254.163";

  function App() {
    App.__super__.constructor.apply(this, arguments);
  }

  App.prototype.initialize = function() {
    var deckId;
    this.gameController = new GameController();
    this.dbController = new DBController();
    deckId = "50df4fe8e4b0d84e5fee60ad";
    return this.dbController.getDeckFromMongoLab(deckId);
  };

  App.prototype.createUser = function(userData, deckData) {
    User.create({
      name: "pepito",
      deck: deckData
    });
    return this.gameController.initialize();
  };

  return App;

})(Spine.Controller);

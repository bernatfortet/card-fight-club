var App,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

App = (function(_super) {

  __extends(App, _super);

  App.prototype.userInfo = null;

  function App() {
    App.__super__.constructor.apply(this, arguments);
    this.gameController = new GameController();
    this.dbController = new DBController();
    this.initialize();
  }

  App.prototype.initialize = function() {
    return this.dbController.getUserInfo();
  };

  App.prototype.createUser = function(userData, deckData) {
    User.create({
      name: userData.name,
      deck: deckData
    });
    return this.gameController.initialize();
  };

  return App;

})(Spine.Controller);

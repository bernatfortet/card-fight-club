var App,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

App = (function(_super) {

  __extends(App, _super);

  function App() {
    App.__super__.constructor.apply(this, arguments);
    log("App Controller initialised", this.debug);
  }

  return App;

})(Spine.Controller);

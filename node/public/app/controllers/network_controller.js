var NetworkController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

NetworkController = (function(_super) {

  __extends(NetworkController, _super);

  function NetworkController() {
    NetworkController.__super__.constructor.apply(this, arguments);
    this.server = io.connect('http:localhost:8080');
  }

  return NetworkController;

})(Spine.Controller);

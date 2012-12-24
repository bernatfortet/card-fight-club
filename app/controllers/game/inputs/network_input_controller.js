var NetworkInputController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

NetworkInputController = (function(_super) {

  __extends(NetworkInputController, _super);

  function NetworkInputController() {
    this.onTest = __bind(this.onTest, this);    NetworkInputController.__super__.constructor.apply(this, arguments);
    this.setListeners();
  }

  NetworkInputController.prototype.setListeners = function() {};

  NetworkInputController.prototype.onTest = function() {
    return console.log("on test");
  };

  return NetworkInputController;

})(InputController);

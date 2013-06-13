var NetworkController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

NetworkController = (function(_super) {
  var local;

  __extends(NetworkController, _super);

  local = true;

  function NetworkController() {
    NetworkController.__super__.constructor.apply(this, arguments);
    this.server = io.connect('http:' + serverIp + ':8080');
    this.setListeners();
  }

  NetworkController.prototype.setListeners = function() {
    return this.server.on('onUserJoinsRoom', this.onUserJoinsRoom);
  };

  NetworkController.prototype.onReady = function() {
    return this.onConnect();
  };

  NetworkController.prototype.onConnect = function() {
    var params;
    params = {
      roomId: "1"
    };
    console.log("OnConnect", params);
    this.sendEvent("onConnect", params);
    if (localServer) return this.onUserJoinsRoom(params);
  };

  NetworkController.prototype.onUserJoinsRoom = function(data) {
    console.log("onUserJoinsRoom", data);
    return app.startGame();
  };

  NetworkController.prototype.sendEvent = function(event, params) {
    params.userId = User.first().id;
    if (!localServer) return this.server.emit(event, params);
  };

  return NetworkController;

})(Spine.Controller);

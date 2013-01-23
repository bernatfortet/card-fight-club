var CounterController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CounterController = (function(_super) {

  __extends(CounterController, _super);

  CounterController.prototype.template = "CounterTemplate";

  CounterController.prototype.cardControllerAttachedTo = null;

  CounterController.prototype.isAttached = false;

  CounterController.prototype.elements = {
    "input": "input"
  };

  function CounterController() {
    CounterController.__super__.constructor.apply(this, arguments);
    this.render();
    this.item.setController(this);
  }

  CounterController.prototype.render = function() {
    this.el = $("#" + this.template).tmpl(this.item);
    return this.setZindex();
  };

  CounterController.prototype.setZindex = function() {
    return this.el.css("z-index", parseInt($(".Counter").last().css("zIndex")) + 1);
  };

  CounterController.prototype.move = function(posX, posY) {
    if (!this.isAttached) {
      this.el.css("left", posX * 100 + "%");
      return this.el.css("top", posY * 100 + "%");
    }
  };

  CounterController.prototype.getLocation = function() {
    var location, xCenterPoint, yCenterPoint;
    xCenterPoint = this.el.offset().left;
    yCenterPoint = this.el.offset().top + this.el.outerHeight();
    return location = {
      x: xCenterPoint / $(window).width(),
      y: yCenterPoint / $(window).height()
    };
  };

  CounterController.prototype.set = function(number) {
    return this.input.val(number);
  };

  CounterController.prototype.attachToCard = function(cardController) {
    var offsetXtoCard, offsetYtoCard;
    this.cardControllerAttachedTo = cardController;
    this.isAttached = true;
    this.el.appendTo(cardController.el);
    this.el.attr("state", "Attached");
    offsetXtoCard = this.el.offset().left - cardController.el.offset().left;
    offsetYtoCard = this.el.offset().top - cardController.el.offset().top;
    this.el.css("left", offsetXtoCard);
    return this.el.css("top", offsetYtoCard);
  };

  CounterController.prototype.unattach = function() {
    var offsetX, offsetY, player;
    offsetX = this.el.offset().left;
    offsetY = this.el.offset().top;
    this.el.css("left", offsetX);
    this.el.css("top", offsetY);
    player = this.getPlayer();
    this.el.appendTo(player.find(".Counters"));
    this.el.attr("state", "");
    this.cardControllerAttachedTo = null;
    return this.isAttached = false;
  };

  CounterController.prototype.getPlayer = function() {
    var player;
    return player = this.el.closest(".Player");
  };

  CounterController.prototype.isElementPlayerOpponent = function() {
    if (this.getPlayer().hasClass("Opponent")) {
      return true;
    } else {
      return false;
    }
  };

  return CounterController;

})(Spine.Controller);

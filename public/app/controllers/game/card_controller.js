var CardController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CardController = (function(_super) {

  __extends(CardController, _super);

  CardController.prototype.template = "CardTemplate";

  CardController.prototype.isTapped = false;

  CardController.prototype.isFlippedUp = false;

  CardController.prototype.attachedCounterControllers = null;

  function CardController() {
    this.unattachCounter = __bind(this.unattachCounter, this);
    this.attachCounter = __bind(this.attachCounter, this);
    this.isVisible = __bind(this.isVisible, this);
    this.zoomOut = __bind(this.zoomOut, this);
    this.zoomIn = __bind(this.zoomIn, this);
    this.flipDown = __bind(this.flipDown, this);
    this.flipUp = __bind(this.flipUp, this);
    this.untap = __bind(this.untap, this);
    this.tap = __bind(this.tap, this);    CardController.__super__.constructor.apply(this, arguments);
    this.render();
    this.attachedCounterControllers = new List();
    this.item.setController(this);
  }

  CardController.prototype.render = function() {
    this.el = $("#" + this.template).tmpl(this.item);
    return this.setZindex();
  };

  CardController.prototype.setZindex = function() {
    return this.el.css("z-index", parseInt($(".Card").last().css("zIndex")) + 1);
  };

  CardController.prototype.move = function(posX, posY) {
    var x, y;
    x = this.el.css("left", posX * 100 + "%");
    return y = this.el.css("top", posY * 100 + "%");
  };

  CardController.prototype.getLocation = function() {
    var location, xCenterPoint, yCenterPoint;
    xCenterPoint = this.el.offset().left;
    yCenterPoint = this.el.offset().top + this.el.children().outerHeight();
    return location = {
      x: xCenterPoint / $(window).width(),
      y: yCenterPoint / $(window).height()
    };
  };

  CardController.prototype.tap = function() {
    this.el.attr("data-tapped", "true");
    return this.isTapped = true;
  };

  CardController.prototype.untap = function() {
    this.el.attr("data-tapped", "false");
    return this.isTapped = false;
  };

  CardController.prototype.flipUp = function() {
    this.el.attr("data-flipped", "up");
    return this.isFlippedUp = true;
  };

  CardController.prototype.flipDown = function() {
    this.el.attr("data-flipped", "down");
    return this.isFlippedUp = false;
  };

  CardController.prototype.zoomIn = function() {
    return this.el.attr("data-zoom", "true");
  };

  CardController.prototype.zoomOut = function() {
    return this.el.attr("data-zoom", "false");
  };

  CardController.prototype.isVisible = function() {
    return this.isFlippedUp;
  };

  CardController.prototype.attachCounter = function(counterController) {
    var exists;
    exists = this.attachedCounterControllers.Exists(counterController);
    if (!exists) return this.attachedCounterControllers.Add(counterController);
  };

  CardController.prototype.unattachCounter = function(counterController) {
    return this.attachedCounterControllers.Remove(counterController);
  };

  CardController.prototype.getHeight = function() {
    return this.el.find(".TapContainer").outerHeight();
  };

  return CardController;

})(Spine.Controller);
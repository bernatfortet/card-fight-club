var CounterController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CounterController = (function(_super) {

  __extends(CounterController, _super);

  CounterController.prototype.template = "CounterTemplate";

  CounterController.prototype.elements = {
    "input": "input"
  };

  function CounterController() {
    this.attachToCard = __bind(this.attachToCard, this);
    this.set = __bind(this.set, this);    CounterController.__super__.constructor.apply(this, arguments);
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
    this.el.css("left", posX * 100 + "%");
    return this.el.css("top", posY * 100 + "%");
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

  CounterController.prototype.attachToCard = function(cardController) {};

  return CounterController;

})(Spine.Controller);

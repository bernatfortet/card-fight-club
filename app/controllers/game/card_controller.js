var CardController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CardController = (function(_super) {

  __extends(CardController, _super);

  CardController.prototype.template = "CardTemplate";

  CardController.prototype.isTapped = false;

  CardController.prototype.isFlippedUp = false;

  function CardController() {
    this.getLocation = __bind(this.getLocation, this);
    this.zoomOut = __bind(this.zoomOut, this);
    this.zoomIn = __bind(this.zoomIn, this);
    this.flipDown = __bind(this.flipDown, this);
    this.flipUp = __bind(this.flipUp, this);
    this.flip = __bind(this.flip, this);
    this.tap = __bind(this.tap, this);    CardController.__super__.constructor.apply(this, arguments);
    this.render();
    this.item.setController(this);
  }

  CardController.prototype.render = function() {
    return this.el = $("#" + this.template).tmpl(this.item);
  };

  CardController.prototype.move = function(posX, posY) {
    this.el.css("left", posX);
    return this.el.css("top", posY);
  };

  CardController.prototype.moveToArea = function(areaId) {
    var areaModel, areaPosX, areaPosY;
    areaModel = Area.find(areaId);
    this.item.setArea(areaModel.id);
    areaPosX = areaModel.controller.el.offset().left;
    areaPosY = areaModel.controller.el.offset().top;
    return this.move(areaPosX, areaPosY);
  };

  CardController.prototype.tap = function() {
    if (this.el.attr("data-tapped") === "false") {
      return this.el.attr("data-tapped", "true");
    } else {
      return this.el.attr("data-tapped", "false");
    }
  };

  CardController.prototype.flip = function() {
    if (this.el.attr("data-flipped") === "up") {
      return this.flipDown();
    } else {
      return this.flipUp();
    }
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

  CardController.prototype.getLocation = function() {
    return {
      location: {
        x: this.el.offset().left,
        y: this.el.offset().top
      }
    };
  };

  return CardController;

})(Spine.Controller);

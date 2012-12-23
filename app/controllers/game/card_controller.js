var CardController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CardController = (function(_super) {

  __extends(CardController, _super);

  CardController.prototype.template = "CardTemplate";

  function CardController() {
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

  CardController.prototype.tap = function() {
    if (this.el.attr("data-tapped") === "false") {
      return this.el.attr("data-tapped", "true");
    } else {
      return this.el.attr("data-tapped", "false");
    }
  };

  CardController.prototype.flip = function() {
    if (this.el.attr("data-flipped") === "false") {
      return this.el.attr("data-flipped", "true");
    } else {
      return this.el.attr("data-flipped", "false");
    }
  };

  return CardController;

})(Spine.Controller);

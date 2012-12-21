var CardController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CardController = (function(_super) {

  __extends(CardController, _super);

  CardController.prototype.template = "CardTemplate";

  function CardController() {
    CardController.__super__.constructor.apply(this, arguments);
    this.render();
  }

  CardController.prototype.render = function() {
    return this.el = $("#" + this.template).tmpl(this.item);
  };

  return CardController;

})(Spine.Controller);

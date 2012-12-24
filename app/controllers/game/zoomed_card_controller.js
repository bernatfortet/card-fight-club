var ZoomedCardController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ZoomedCardController = (function(_super) {

  __extends(ZoomedCardController, _super);

  function ZoomedCardController() {
    this.zoomOut = __bind(this.zoomOut, this);
    this.zoomIn = __bind(this.zoomIn, this);    ZoomedCardController.__super__.constructor.apply(this, arguments);
  }

  ZoomedCardController.prototype.zoomIn = function(card) {
    if (card.controller.isFlippedUp) {
      this.el.css("background-image", "url('images/cards/" + card.controller.item.img_id + ".jpg')");
      return console.log("Zooming In");
    }
  };

  ZoomedCardController.prototype.zoomOut = function() {
    this.el.css("background-image", "none");
    return console.log("Zooming In");
  };

  return ZoomedCardController;

})(Spine.Controller);

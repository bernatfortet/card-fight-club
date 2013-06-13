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

  ZoomedCardController.prototype.zoomIn = function(cardModel) {
    if (cardModel.controller === null || cardModel.controller.isFlippedUp) {
      this.el.attr("data-isZooming", "true");
      return this.el.css("background-image", "url('" + cardModel.image_url + "')");
    }
  };

  ZoomedCardController.prototype.zoomOut = function() {
    this.el.attr("data-isZooming", "false");
    return this.el.css("background-image", "none");
  };

  return ZoomedCardController;

})(Spine.Controller);

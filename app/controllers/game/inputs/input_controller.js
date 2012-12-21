var InputController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

InputController = (function(_super) {

  __extends(InputController, _super);

  function InputController() {
    InputController.__super__.constructor.apply(this, arguments);
    $(".Card").draggable();
  }

  return InputController;

})(Spine.Controller);

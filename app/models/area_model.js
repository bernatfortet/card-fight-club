var Area,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Area = (function(_super) {

  __extends(Area, _super);

  function Area() {
    Area.__super__.constructor.apply(this, arguments);
  }

  Area.configure('Area');

  Area.include({
    test: function() {
      return console.log("hellow");
    }
  });

  return Area;

})(Spine.Model);

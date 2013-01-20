var Counter,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Counter = (function(_super) {

  __extends(Counter, _super);

  function Counter() {
    Counter.__super__.constructor.apply(this, arguments);
  }

  Counter.configure('Counter', 'id', 'number', "attached_card_id", "controller");

  Counter.include({
    setNumber: function(number) {
      this.number = number;
      return this.save();
    },
    setController: function(counterController) {
      this.controller = counterController;
      return this.save();
    }
  });

  return Counter;

})(Spine.Model);

var BoardController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

BoardController = (function(_super) {

  __extends(BoardController, _super);

  function BoardController() {
    BoardController.__super__.constructor.apply(this, arguments);
  }

  BoardController.prototype.onCardDrops = function(card) {
    if (!card.controller.isFlippedUp && !this.player.isPlayerNetworked()) {
      return this.player.flipCardUp(card);
    } else if (card.controller.isFlippedUp) {
      return this.player.flipCardUp(card);
    }
  };

  return BoardController;

})(AreaController);

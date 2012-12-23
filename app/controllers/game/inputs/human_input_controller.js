var HumanInputController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

HumanInputController = (function(_super) {

  __extends(HumanInputController, _super);

  function HumanInputController() {
    this.onCardDragStops = __bind(this.onCardDragStops, this);
    this.onDoubleClick = __bind(this.onDoubleClick, this);
    this.onRightMouseClick = __bind(this.onRightMouseClick, this);    HumanInputController.__super__.constructor.apply(this, arguments);
    this.setListeners();
  }

  HumanInputController.prototype.setListeners = function() {
    $(".Card").draggable({
      stop: this.onCardDragStops
    });
    $(".Card").on("dblclick", this.onDoubleClick);
    return $(".Card").on("contextmenu", this.onRightMouseClick);
  };

  HumanInputController.prototype.onRightMouseClick = function(event) {
    var RIGHT_MOUSE_BUTTON;
    RIGHT_MOUSE_BUTTON = 3;
    if (event.which === RIGHT_MOUSE_BUTTON) {
      return this.onCardIsTapped(this.getCardId(event.target));
    }
  };

  HumanInputController.prototype.onDoubleClick = function(event) {
    return this.onCardIsFlipped(this.getCardId(event.target));
  };

  HumanInputController.prototype.onCardDragStops = function(event, ui) {
    var cardPosition;
    cardPosition = ui.position;
    return this.onCardIsMoved(this.getCardId(event.target), ui.position);
  };

  HumanInputController.prototype.getCardId = function(eventTarget) {
    var card, cardId;
    card = $(eventTarget);
    return cardId = card.data().id;
  };

  return HumanInputController;

})(InputController);

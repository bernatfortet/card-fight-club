var HumanInputController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

HumanInputController = (function(_super) {

  __extends(HumanInputController, _super);

  HumanInputController.prototype.activeCard = null;

  HumanInputController.prototype.zoomingCard = false;

  function HumanInputController() {
    this.onMouseOutCard = __bind(this.onMouseOutCard, this);
    this.onMouseOverCard = __bind(this.onMouseOverCard, this);
    this.onDropCardOnDeck = __bind(this.onDropCardOnDeck, this);
    this.onDropCardOnHand = __bind(this.onDropCardOnHand, this);
    this.onCardDragStops = __bind(this.onCardDragStops, this);
    this.onDoubleClick = __bind(this.onDoubleClick, this);
    this.onRightMouseClick = __bind(this.onRightMouseClick, this);    HumanInputController.__super__.constructor.apply(this, arguments);
    this.setListeners();
  }

  HumanInputController.prototype.setListeners = function() {
    $(".Card").draggable({
      stop: this.onCardDragStops,
      snap: ".Hand, .Deck, .Graveyard",
      snapMode: "inner"
    });
    $(".Hand").droppable({
      drop: this.onDropCardOnHand
    });
    $(".Deck").droppable({
      drop: this.onDropCardOnDeck
    });
    $(".Card").on("dblclick", this.onDoubleClick);
    $(".Card").on("contextmenu", this.onRightMouseClick);
    $(".Card").on("mouseover", this.onMouseOverCard);
    return $(".Card").on("mouseout", this.onMouseOutCard);
  };

  HumanInputController.prototype.onRightMouseClick = function(event) {
    var RIGHT_MOUSE_BUTTON;
    RIGHT_MOUSE_BUTTON = 3;
    if (event.which === RIGHT_MOUSE_BUTTON) {
      return this.onCardIsTapped(this.getCardId(event.currentTarget));
    }
  };

  HumanInputController.prototype.onDoubleClick = function(event) {
    return this.onCardIsFlipped(this.getCardId(event.currentTarget));
  };

  HumanInputController.prototype.onCardDragStops = function(event, ui) {
    var cardPosition;
    cardPosition = ui.position;
    return this.onCardIsMoved(this.getCardId(event.target), ui.position);
  };

  HumanInputController.prototype.onDropCardOnHand = function(event, ui) {
    this.onCardGoesToHand(this.getCardId(ui.draggable), ui.position);
    return console.log("onDropCardOnHand");
  };

  HumanInputController.prototype.onDropCardOnDeck = function(event, ui) {
    this.onCardGoesToDeck(this.getCardId(ui.draggable), ui.position);
    return console.log("onDropCardOnDeck");
  };

  HumanInputController.prototype.onMouseOverCard = function(event) {
    this.activeCard = event.currentTarget;
    this.onZoomCardIn(this.getCardId(this.activeCard));
    return console.log("onMouseOverCard", this.activeCard);
  };

  HumanInputController.prototype.onMouseOutCard = function(event) {
    this.activeCard = null;
    this.onZoomCardOut();
    return console.log("onMouseOutCard");
  };

  HumanInputController.prototype.getCardId = function(cardTarget) {
    var card, cardId;
    card = $(cardTarget);
    return cardId = card.data().id;
  };

  return HumanInputController;

})(InputController);

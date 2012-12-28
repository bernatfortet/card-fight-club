var HumanInputController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

HumanInputController = (function(_super) {

  __extends(HumanInputController, _super);

  HumanInputController.prototype.activeCard = null;

  HumanInputController.prototype.humanPlayer = null;

  HumanInputController.prototype.originalWidth = null;

  HumanInputController.prototype.originalHeight = null;

  function HumanInputController() {
    this.onMouseOutCard = __bind(this.onMouseOutCard, this);
    this.onMouseOverCard = __bind(this.onMouseOverCard, this);
    this.onDropCardOnArea = __bind(this.onDropCardOnArea, this);
    this.onCardDragStops = __bind(this.onCardDragStops, this);
    this.onDoubleClickDeck = __bind(this.onDoubleClickDeck, this);
    this.onDoubleClickCard = __bind(this.onDoubleClickCard, this);
    this.onRightMouseClick = __bind(this.onRightMouseClick, this);    HumanInputController.__super__.constructor.apply(this, arguments);
    this.originalWidth = $(window).width();
    this.originalHeight = $(window).height();
  }

  HumanInputController.prototype.setListeners = function() {
    $(".Player .Area").droppable({
      drop: this.onDropCardOnArea
    });
    $(".Player .Deck").on("dblclick", this.onDoubleClickDeck);
    $.contextMenu({
      selector: ".Player .CardPile",
      items: {
        shuffle: {
          name: "Shuffle",
          callback: this.onShuffleArea
        },
        view: {
          name: "View Cards",
          callback: this.onViewCardsFromArea
        }
      }
    });
    return $(".Player .Graveyard").droppable({
      drop: this.onDropCardOnGraveyard
    });
  };

  HumanInputController.prototype.setCardListeners = function(cardElement) {
    cardElement.draggable({
      stop: this.onCardDragStops,
      snap: ".Hand, .Deck, .Graveyard",
      snapMode: "inner"
    });
    cardElement.on("dblclick", this.onDoubleClickCard);
    cardElement.on("contextmenu", this.onRightMouseClick);
    return this.setCardHoverListener(cardElement);
  };

  HumanInputController.prototype.setCardHoverListener = function(cardElement) {
    cardElement.on("mouseover", this.onMouseOverCard);
    return cardElement.on("mouseout", this.onMouseOutCard);
  };

  HumanInputController.prototype.onRightMouseClick = function(event) {
    var RIGHT_MOUSE_BUTTON;
    RIGHT_MOUSE_BUTTON = 3;
    if (event.which === RIGHT_MOUSE_BUTTON) {
      return this.onTapCard(this.getCardId(event.currentTarget));
    }
  };

  HumanInputController.prototype.onDoubleClickCard = function(event) {
    var flipState;
    flipState = $(event.currentTarget).attr("data-flipped");
    if (flipState === "up") {
      return this.onFlipCardDown(this.getCardId(event.currentTarget));
    } else {
      return this.onFlipCardUp(this.getCardId(event.currentTarget));
    }
  };

  HumanInputController.prototype.onDoubleClickDeck = function() {
    return this.onDrawCard();
  };

  HumanInputController.prototype.onCardDragStops = function(event, ui) {
    var cardPosition, location;
    cardPosition = ui.position;
    location = {
      x: ui.position.left / $(window).width(),
      y: ui.position.top / $(window).height()
    };
    return this.onMoveCard(this.getCardId(event.target), location);
  };

  HumanInputController.prototype.onDropCardOnArea = function(event, ui) {
    var areaId;
    areaId = $(event.target).data().areaId;
    return this.onCardGoesToArea(this.getCardId(ui.draggable), areaId);
  };

  HumanInputController.prototype.onMouseOverCard = function(event) {
    this.activeCard = event.currentTarget;
    return this.onZoomCardIn(this.getCardId(this.activeCard));
  };

  HumanInputController.prototype.onMouseOutCard = function(event) {
    this.activeCard = null;
    return this.onZoomCardOut();
  };

  HumanInputController.prototype.getCardId = function(cardTarget) {
    var card, cardId;
    card = $(cardTarget);
    return cardId = card.data().id;
  };

  return HumanInputController;

})(InputController);

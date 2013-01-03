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
    this.onTopCardFromAreaIsRevealedToggle = __bind(this.onTopCardFromAreaIsRevealedToggle, this);
    this.onCardChangesArea = __bind(this.onCardChangesArea, this);
    this.onCardDragStops = __bind(this.onCardDragStops, this);
    this.onMouseOutArea = __bind(this.onMouseOutArea, this);
    this.onMouseOverArea = __bind(this.onMouseOverArea, this);
    this.onDoubleClickArea = __bind(this.onDoubleClickArea, this);
    this.onDoubleClickCard = __bind(this.onDoubleClickCard, this);
    this.onRightMouseClick = __bind(this.onRightMouseClick, this);
    this.onAddNCards = __bind(this.onAddNCards, this);
    this.setKeyboardListeners = __bind(this.setKeyboardListeners, this);    HumanInputController.__super__.constructor.apply(this, arguments);
    this.originalWidth = $(window).width();
    this.originalHeight = $(window).height();
  }

  HumanInputController.prototype.setListeners = function() {
    $(".Player .Area").droppable({
      drop: this.onCardChangesArea,
      hoverClass: "Active"
    });
    $(".Area").on("mouseover", this.onMouseOverArea);
    $(".Area").on("mouseout", this.onMouseOutArea);
    $(".Player .CardPile").on("dblclick", this.onDoubleClickArea);
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
        },
        reveal: {
          name: "Reveal / Unreveal Top Card",
          callback: this.onTopCardFromAreaIsRevealedToggle
        }
      }
    });
    return this.setKeyboardListeners();
  };

  HumanInputController.prototype.setCardListeners = function(cardElement) {
    cardElement.draggable({
      stop: this.onCardDragStops,
      snap: ".Hand, .Deck, .Graveyard",
      snapMode: "inner",
      stack: ".Card"
    });
    cardElement.on("dblclick", this.onDoubleClickCard);
    cardElement.on("contextmenu", this.onRightMouseClick);
    return this.setCardHoverListener(cardElement);
  };

  HumanInputController.prototype.setCardHoverListener = function(cardElement) {
    cardElement.on("mouseover", this.onMouseOverCard);
    return cardElement.on("mouseout", this.onMouseOutCard);
  };

  HumanInputController.prototype.setKeyboardListeners = function() {
    var _this = this;
    jwerty.key('1', function() {
      return _this.onAddNCards(1);
    });
    jwerty.key('2', function() {
      return _this.onAddNCards(2);
    });
    jwerty.key('3', function() {
      return _this.onAddNCards(3);
    });
    jwerty.key('4', function() {
      return _this.onAddNCards(4);
    });
    jwerty.key('5', function() {
      return _this.onAddNCards(5);
    });
    jwerty.key('6', function() {
      return _this.onAddNCards(6);
    });
    return jwerty.key('7', function() {
      return _this.onAddNCards(7);
    });
  };

  HumanInputController.prototype.onAddNCards = function(numCards) {
    var iCounter, _results;
    _results = [];
    for (iCounter = 0; 0 <= numCards ? iCounter < numCards : iCounter > numCards; 0 <= numCards ? iCounter++ : iCounter--) {
      _results.push(this.onDrawCardFromArea(this.targetPlayer.deckArea.id));
    }
    return _results;
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

  HumanInputController.prototype.onDoubleClickArea = function(event) {
    var areaId;
    areaId = $(event.target).data().areaId;
    return this.onDrawCardFromArea(areaId);
  };

  HumanInputController.prototype.onMouseOverArea = function(event) {
    var areaId;
    areaId = $(event.target).data().areaId;
    return Area.find(areaId).controller.onMouseOver();
  };

  HumanInputController.prototype.onMouseOutArea = function(event) {
    var areaId;
    areaId = $(event.target).data().areaId;
    return Area.find(areaId).controller.onMouseOut();
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

  HumanInputController.prototype.onCardChangesArea = function(event, ui) {
    var areaId;
    areaId = $(event.target).data().areaId;
    return this.onChangeCardArea(this.getCardId(ui.draggable), areaId);
  };

  HumanInputController.prototype.onTopCardFromAreaIsRevealedToggle = function(key, opt) {
    var areaId;
    areaId = opt.$trigger.data().areaId;
    return this.onToggleRevealTopCardFromArea(areaId);
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

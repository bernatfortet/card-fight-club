var HumanInputController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

HumanInputController = (function(_super) {

  __extends(HumanInputController, _super);

  HumanInputController.prototype.activeCard = null;

  HumanInputController.prototype.humanPlayer = null;

  function HumanInputController() {
    this.sendChatMsg = __bind(this.sendChatMsg, this);
    this.onElementDropsOnCounter = __bind(this.onElementDropsOnCounter, this);
    this.onElementDropsOnCard = __bind(this.onElementDropsOnCard, this);
    this.onClickCounter = __bind(this.onClickCounter, this);
    this.onMouseOverCounter = __bind(this.onMouseOverCounter, this);
    this.onCounterDragStops = __bind(this.onCounterDragStops, this);
    this.onResize = __bind(this.onResize, this);
    this.onSubmitNumber = __bind(this.onSubmitNumber, this);
    this.onMouseOutCard = __bind(this.onMouseOutCard, this);
    this.onMouseOverCard = __bind(this.onMouseOverCard, this);
    this.onTopCardFromAreaIsRevealedToggle = __bind(this.onTopCardFromAreaIsRevealedToggle, this);
    this.onElementDropsOnArea = __bind(this.onElementDropsOnArea, this);
    this.onCardDragStops = __bind(this.onCardDragStops, this);
    this.onMouseOutArea = __bind(this.onMouseOutArea, this);
    this.onMouseOverArea = __bind(this.onMouseOverArea, this);
    this.onDoubleClickArea = __bind(this.onDoubleClickArea, this);
    this.onDoubleClickCard = __bind(this.onDoubleClickCard, this);
    this.onRightMouseClickCard = __bind(this.onRightMouseClickCard, this);
    this.onAddNCards = __bind(this.onAddNCards, this);
    this.setKeyboardListeners = __bind(this.setKeyboardListeners, this);    HumanInputController.__super__.constructor.apply(this, arguments);
  }

  HumanInputController.prototype.setListeners = function() {
    var _this = this;
    $(".HumanPlayer .Area").droppable({
      drop: this.onElementDropsOnArea,
      hoverClass: "Active"
    });
    $(".Area").on("mouseover", this.onMouseOverArea);
    $(".Area").on("mouseout", this.onMouseOutArea);
    $(".HumanPlayer .CardPile").on("dblclick", this.onDoubleClickArea);
    $(".HumanPlayer .CardPile").draggable({
      helper: "clone",
      stop: function(event, ui) {
        var areaModel, cardController, cardLocation, originCardPileClone;
        originCardPileClone = $(ui.helper);
        cardLocation = {
          x: originCardPileClone.offset().left / $(window).width(),
          y: originCardPileClone.offset().top / $(window).height()
        };
        areaModel = Area.find($(event.target).data().areaId);
        cardController = _this.targetPlayer.createCardFromTopOfArea(areaModel);
        _this.onMoveCard(cardController.item.id, cardLocation);
        return originCardPileClone.remove();
      }
    });
    $.contextMenu({
      selector: ".HumanPlayer .CardPile",
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
    this.setKeyboardListeners();
    this.setChatListeners();
    this.setElementListeners();
    return $(window).on("resize", this.onResize);
  };

  HumanInputController.prototype.setCardListeners = function(cardElement) {
    cardElement.draggable({
      stop: this.onCardDragStops,
      snap: ".Hand, .Deck, .Graveyard",
      snapMode: "inner",
      stack: ".Card"
    });
    cardElement.on("dblclick", this.onDoubleClickCard);
    cardElement.on("contextmenu", this.onRightMouseClickCard);
    cardElement.find(".TapContainer").droppable({
      drop: this.onElementDropsOnCard,
      hoverClass: "Active"
    });
    return this.setCardHoverListener(cardElement);
  };

  HumanInputController.prototype.setCardHoverListener = function(cardElement) {
    cardElement.on("mouseover", this.onMouseOverCard);
    return cardElement.on("mouseout", this.onMouseOutCard);
  };

  HumanInputController.prototype.setKeyboardListeners = function() {
    var _this = this;
    $('body').bind('keyup', jwerty.event('ctrl+1', function() {
      return _this.onAddNCards(1);
    }));
    $('body').bind('keyup', jwerty.event('ctrl+2', function() {
      return _this.onAddNCards(2);
    }));
    $('body').bind('keyup', jwerty.event('ctrl+3', function() {
      return _this.onAddNCards(3);
    }));
    $('body').bind('keyup', jwerty.event('ctrl+4', function() {
      return _this.onAddNCards(4);
    }));
    $('body').bind('keyup', jwerty.event('ctrl+5', function() {
      return _this.onAddNCards(5);
    }));
    $('body').bind('keyup', jwerty.event('ctrl+6', function() {
      return _this.onAddNCards(6);
    }));
    $('body').bind('keyup', jwerty.event('ctrl+7', function() {
      return _this.onAddNCards(7);
    }));
    return $('body').bind('keyup', jwerty.event('ctrl+M', function(event) {
      return app.gameController.reset();
    }));
  };

  HumanInputController.prototype.setChatListeners = function() {
    var _this = this;
    $(".Chat").on("click", function() {
      $(".Chat input").focus();
      return app.gameController.chatController.flashInput();
    });
    $(".Chat input").on("keydown", jwerty.event('enter', function(event) {
      _this.sendChatMsg(event);
      return $(".Chat input").val("");
    }));
    $(".Chat .YourTurn").on("click", this.onPassTurn);
    return $('body').bind('keyup', jwerty.event('ctrl+space', function() {
      var params;
      params = {
        userName: User.first().name
      };
      app.gameController.chatController.renderTurnPassing(params);
      return _this.onPassTurn();
    }));
  };

  HumanInputController.prototype.setElementListeners = function() {
    var _this = this;
    $(".CounterOrigin").draggable({
      helper: "clone",
      stop: function(event, ui) {
        var counterController, counterLocation, originCounterClone;
        originCounterClone = $(ui.helper);
        counterLocation = {
          x: originCounterClone.offset().left / $(window).width(),
          y: originCounterClone.offset().top / $(window).height()
        };
        counterController = _this.createCounter();
        _this.onMoveCounter(counterController.item.id, counterLocation);
        return originCounterClone.remove();
      }
    });
    $(".CounterOrigin").droppable({
      drop: this.onElementDropsOnCounter,
      hoverClass: "Active"
    });
    return $(".Dice").on("click", this.onThrowDice);
  };

  HumanInputController.prototype.onAddNCards = function(numCards) {
    var iCounter, _results;
    _results = [];
    for (iCounter = 0; 0 <= numCards ? iCounter < numCards : iCounter > numCards; 0 <= numCards ? iCounter++ : iCounter--) {
      _results.push(this.onDrawCardFromArea(this.targetPlayer.deckArea.id));
    }
    return _results;
  };

  HumanInputController.prototype.onRightMouseClickCard = function(event) {
    var RIGHT_MOUSE_BUTTON, tapState;
    RIGHT_MOUSE_BUTTON = 3;
    if (event.which === RIGHT_MOUSE_BUTTON) {
      if (!debugApp) event.preventDefault();
      tapState = $(event.currentTarget).attr("data-tapped");
      if (tapState === "true") {
        return this.onUntapCard(this.getTargetObjectId(event.currentTarget));
      } else {
        return this.onTapCard(this.getTargetObjectId(event.currentTarget));
      }
    }
  };

  HumanInputController.prototype.onDoubleClickCard = function(event) {
    var flipState;
    flipState = $(event.currentTarget).attr("data-flipped");
    if (flipState === "up") {
      return this.onFlipCardDown(this.getTargetObjectId(event.currentTarget));
    } else {
      return this.onFlipCardUp(this.getTargetObjectId(event.currentTarget));
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
    return this.onMoveCard(this.getTargetObjectId(event.target), location);
  };

  HumanInputController.prototype.onElementDropsOnArea = function(event, ui) {
    var areaId, counterId, dropedElement;
    dropedElement = $(ui.draggable);
    if (dropedElement.hasClass("Card")) {
      areaId = $(event.target).data().areaId;
      return this.onChangeCardArea(this.getTargetObjectId(ui.draggable), areaId);
    } else if (dropedElement.hasClass("Counter")) {
      counterId = this.getTargetObjectId(dropedElement);
      return this.onUnattachCounter(counterId);
    }
  };

  HumanInputController.prototype.onTopCardFromAreaIsRevealedToggle = function(key, opt) {
    var areaId;
    areaId = opt.$trigger.data().areaId;
    return this.onToggleRevealTopCardFromArea(areaId);
  };

  HumanInputController.prototype.onMouseOverCard = function(event) {
    this.activeCard = event.currentTarget;
    return this.onZoomCardIn(this.getTargetObjectId(this.activeCard));
  };

  HumanInputController.prototype.onMouseOutCard = function(event) {
    this.activeCard = null;
    return this.onZoomCardOut();
  };

  HumanInputController.prototype.onSubmitNumber = function(event) {
    return console.log(" asdf");
  };

  HumanInputController.prototype.onResize = function(event) {
    var handOuterHeight;
    console.log("OnResize");
    $(".Playzone").width($("#WebsiteApp").width() - $(".Sidebar").outerWidth());
    handOuterHeight = $(".HumanPlayer .Hand").outerHeight() + parseFloat($(".HumanPlayer .Hand").css("bottom")) + 18;
    $(".Board").height($(".HumanPlayer").outerHeight() - handOuterHeight);
    $(".Board, .Hand").width($(".Deck").offset().left - 20);
    return $(".Conversation").height($(".Playzone").outerHeight() - 20 - (parseFloat($(".Conversation").css("top")) + parseFloat($(".Chat .Input").css("bottom")) + $(".Chat .Input").outerHeight()));
  };

  HumanInputController.prototype.createCounter = function() {
    var counterModel;
    counterModel = Counter.create({
      number: 0,
      attached_card_id: null,
      controller: null
    });
    return this.onCreateCounter(counterModel);
  };

  HumanInputController.prototype.setCounterListener = function(counterController) {
    var counterElement,
      _this = this;
    counterElement = counterController.el;
    counterElement.draggable({
      stop: this.onCounterDragStops,
      stack: ".Counter"
    });
    counterElement.find("input").on("keydown", jwerty.event('enter', function(event) {
      var counterNumber;
      counterNumber = counterElement.find("input").val();
      return _this.onSetCounter(counterController.item.id, counterNumber);
    }));
    counterElement.find("input");
    return counterElement.on("click", this.onClickCounter);
  };

  HumanInputController.prototype.onCounterDragStops = function(event, ui) {
    var counterPosition, location;
    counterPosition = $(ui.helper).offset();
    location = {
      x: counterPosition.left / $(window).width(),
      y: counterPosition.top / $(window).height()
    };
    return this.onMoveCounter(this.getTargetObjectId(event.target), location);
  };

  HumanInputController.prototype.onMouseOverCounter = function(event) {
    var counterController;
    return counterController = this.getTargetCounterController(event.currentTarget);
  };

  HumanInputController.prototype.onClickCounter = function(event) {
    var counterController;
    counterController = this.getTargetCounterController(event.currentTarget);
    return counterController.el.attr("state", "Active");
  };

  HumanInputController.prototype.onElementDropsOnCard = function(event, ui) {
    var _this = this;
    return setTimeout(function() {
      var cardElement, cardId, counterId, dropedElement;
      cardElement = $(event.target).closest(".Card");
      dropedElement = $(ui.draggable);
      if (dropedElement.hasClass("Counter")) {
        cardId = _this.getTargetObjectId(cardElement);
        counterId = _this.getTargetObjectId(dropedElement);
        return _this.onAttachCounterToCard(counterId, cardId);
      }
    }, 0);
  };

  HumanInputController.prototype.onElementDropsOnCounter = function(event, ui) {
    var counterId, dropedElement;
    dropedElement = $(ui.draggable);
    if (dropedElement.hasClass("Counter")) {
      counterId = this.getTargetObjectId(dropedElement);
      return this.onRemoveCounter(counterId);
    }
  };

  HumanInputController.prototype.sendChatMsg = function(event) {
    var msg, params;
    msg = $(event.target).val();
    params = {
      userName: User.first().name,
      msg: msg
    };
    app.gameController.chatController.renderChatMsg(params);
    return app.gameController.multiplayerController.onSendChatMsg(msg);
  };

  HumanInputController.prototype.getTargetObjectId = function(target) {
    var isJqueryObject, targetId;
    isJqueryObject = target instanceof jQuery;
    if (isJqueryObject) {
      return targetId = target.data().id;
    } else {
      return targetId = $(target).data().id;
    }
  };

  HumanInputController.prototype.getTargetCardController = function(target) {
    var cardController, targetobjectId;
    targetobjectId = this.getTargetObjectId(target);
    return cardController = Card.find(targetobjectId).controller;
  };

  HumanInputController.prototype.getTargetCounterController = function(target) {
    var counterController, targetobjectId;
    targetobjectId = this.getTargetObjectId(target);
    return counterController = Counter.find(targetobjectId).controller;
  };

  return HumanInputController;

})(InputController);

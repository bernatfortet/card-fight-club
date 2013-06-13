var CardListerController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CardListerController = (function(_super) {

  __extends(CardListerController, _super);

  CardListerController.prototype.currentList = null;

  CardListerController.prototype.selectedItem = null;

  CardListerController.prototype.currentArea = null;

  CardListerController.prototype.currentDeckId = null;

  function CardListerController() {
    this.moveCardToBottom = __bind(this.moveCardToBottom, this);
    this.moveCardToTop = __bind(this.moveCardToTop, this);
    this.moveCardDown = __bind(this.moveCardDown, this);
    this.moveCardUp = __bind(this.moveCardUp, this);
    this.closeLister = __bind(this.closeLister, this);
    this.onMouseOverItem = __bind(this.onMouseOverItem, this);
    this.onClickItem = __bind(this.onClickItem, this);    CardListerController.__super__.constructor.apply(this, arguments);
    this.el.find(".Close").on("click", this.closeLister);
    this.el.on("click", "li", this.onClickItem);
    this.el.on("mouseover", "li", this.onMouseOverItem);
    this.el.find(".MoveToTop").on("click", this.moveCardToTop);
    this.el.find(".MoveUp").on("click", this.moveCardUp);
    this.el.find(".MoveDown").on("click", this.moveCardDown);
    this.el.find(".MoveToBottom").on("click", this.moveCardToBottom);
  }

  CardListerController.prototype.onClickItem = function(event) {
    var clickedItem;
    this.cleanSelectedItem();
    clickedItem = $(event.currentTarget);
    this.selectedItem = clickedItem;
    return clickedItem.attr("data-state", "selected");
  };

  CardListerController.prototype.onMouseOverItem = function(event) {
    var cardId, mouseOverItem;
    mouseOverItem = $(event.currentTarget);
    cardId = mouseOverItem.attr("data-card-id");
    return app.gameController.humanInputController.onZoomCardIn(cardId);
  };

  CardListerController.prototype.cleanSelectedItem = function() {
    return this.el.find("li[data-state='selected']").attr("data-state", "");
  };

  CardListerController.prototype.closeLister = function() {
    this.el.find(".List").html("");
    this.el.attr("data-state", "hidden");
    return app.gameController.humanInputController.onZoomCardOut();
  };

  CardListerController.prototype.showCardsFromArea = function(area) {
    var cards;
    this.closeLister();
    this.cleanSelectedItem();
    cards = area.getCardsModels();
    this.renderCards(cards);
    this.currentArea = area;
    this.currentList = cards;
    return this.el.attr("data-state", "visible");
  };

  CardListerController.prototype.renderCards = function(cards) {
    var objectIndex, _results;
    _results = [];
    for (objectIndex in cards) {
      _results.push(this.renderCard(cards[objectIndex]));
    }
    return _results;
  };

  CardListerController.prototype.renderCard = function(card) {
    return this.el.find(".List").append("<li data-card-id='" + card.id + "'>" + card.name + "</li>");
  };

  CardListerController.prototype.refresh = function() {
    return this.showCardsFromArea(this.currentArea);
  };

  CardListerController.prototype.moveCardUp = function() {
    this.currentArea.moveCardUp(this.selectedItem.index());
    return this.refresh();
  };

  CardListerController.prototype.moveCardDown = function() {
    this.currentArea.moveCardDown(this.selectedItem.index());
    return this.refresh();
  };

  CardListerController.prototype.moveCardToTop = function() {
    this.currentArea.moveCardToTop(this.selectedItem.index());
    return this.refresh();
  };

  CardListerController.prototype.moveCardToBottom = function() {
    this.currentArea.moveCardToBottom(this.selectedItem.index());
    return this.refresh();
  };

  return CardListerController;

})(Spine.Controller);

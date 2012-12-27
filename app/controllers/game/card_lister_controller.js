var CardListerController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CardListerController = (function(_super) {

  __extends(CardListerController, _super);

  CardListerController.prototype.template = '<li>${card.name}<li>';

  CardListerController.prototype.currentList = null;

  CardListerController.prototype.selectedItem = null;

  CardListerController.prototype.currentArea = null;

  CardListerController.prototype.currentDeckId = null;

  function CardListerController() {
    this.closeLister = __bind(this.closeLister, this);
    this.onClickItem = __bind(this.onClickItem, this);    CardListerController.__super__.constructor.apply(this, arguments);
    this.el.find(".Close").on("click", this.closeLister);
    this.el.on("click", "li", this.onClickItem);
  }

  CardListerController.prototype.onClickItem = function(event) {
    var clickedItem;
    this.el.find("li[data-state='selected']").attr("data-state", "");
    clickedItem = $(event.currentTarget);
    this.selectedItem = clickedItem;
    return clickedItem.attr("data-state", "selected");
  };

  CardListerController.prototype.closeLister = function() {
    this.el.find(".List").html("");
    return this.el.attr("data-state", "hidden");
  };

  CardListerController.prototype.showDeckCards = function(deckId) {
    return this.showCardsFromArea(deckId, "deck");
  };

  CardListerController.prototype.showCardsFromArea = function(deckId, area) {
    var cards;
    this.closeLister();
    cards = Deck.find(deckId).getCardsModelListFromArea(area);
    this.renderCards(cards);
    this.currentArea = area;
    this.currentDeckId = deckId;
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
    return this.el.find(".List").append("<li>" + card.name + "</li>");
  };

  CardListerController.prototype.refresh = function() {
    return this.showCardsFromArea(this.currentDeckId, this.currentArea);
  };

  CardListerController.prototype.moveCardUp = function() {
    var itemIndex, newIndex;
    itemIndex = selectedItem.index();
    newIndex = itemIndex - 1;
    Deck.find(this.currentDeckId).moveItemInArea(itemIndex, newIndex, area);
    return this.refresh();
  };

  CardListerController.prototype.moveCardDown = function() {
    var itemIndex, newIndex;
    itemIndex = selectedItem.index();
    newIndex = itemIndex + 1;
    Deck.find(this.currentDeckId).moveItemInArea(itemIndex, newIndex, area);
    return this.refresh();
  };

  CardListerController.prototype.moveCardToTop = function() {
    var itemIndex, newIndex;
    itemIndex = selectedItem.index();
    newIndex = 0;
    Deck.find(this.currentDeckId).moveItemInArea(itemIndex, newIndex, area);
    return this.refresh();
  };

  CardListerController.prototype.moveCardBottom = function() {
    var itemIndex, newIndex;
    itemIndex = selectedItem.index();
    newIndex = -1;
    Deck.find(this.currentDeckId).moveItemInArea(itemIndex, newIndex, area);
    return this.refresh();
  };

  return CardListerController;

})(Spine.Controller);

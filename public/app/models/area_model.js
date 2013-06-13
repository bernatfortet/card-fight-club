var Area,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Area = (function(_super) {

  __extends(Area, _super);

  function Area() {
    Area.__super__.constructor.apply(this, arguments);
  }

  Area.configure('Area', "name", 'cards', 'controller');

  Area.include({
    setController: function(controller) {
      this.controller = controller;
      return this.save();
    },
    setList: function() {
      this.cards = new List();
      return this.save();
    },
    getTopCard: function() {
      var topCard;
      if (!this.cards.isEmpty()) {
        topCard = this.cards.list[0];
        return Card.find(topCard);
      }
    },
    getAndRemoveTopCard: function() {
      var topCard;
      if (!this.cards.isEmpty()) {
        topCard = this.cards.list[0];
        this.cards.Remove(topCard);
        return Card.find(topCard);
      }
    },
    isEmpty: function() {
      return this.cards.Count() <= 0;
    },
    shuffle: function() {
      return this.shuffleWithModernFisherYates();
    },
    shuffleWithModernFisherYates: function() {
      var array, i, j, length, swap, _results;
      length = this.cards.Count();
      array = this.cards.list;
      i = length;
      _results = [];
      while (--i) {
        j = Rand() * (i + 1) | 0;
        swap = array[i];
        array[i] = array[j];
        _results.push(array[j] = swap);
      }
      return _results;
    },
    addCard: function(cardModel) {
      return this.cards.Insert(0, cardModel.id);
    },
    removeCard: function(cardModel) {
      return this.cards.Remove(cardModel.id);
    },
    moveCardUp: function(itemIndex) {
      var newIndex;
      newIndex = itemIndex - 1;
      return this.moveCard(itemIndex, newIndex);
    },
    moveCardDown: function(itemIndex) {
      var newIndex;
      newIndex = itemIndex + 1;
      return this.moveCard(itemIndex, newIndex);
    },
    moveCardToTop: function(itemIndex) {
      var newIndex;
      newIndex = 0;
      return this.moveCard(itemIndex, newIndex);
    },
    moveCardToBottom: function(itemIndex) {
      var newIndex;
      newIndex = this.cards.Count() - 1;
      return this.moveCard(itemIndex, newIndex);
    },
    moveCard: function(itemIndex, newIndex) {
      this.cards.Move(itemIndex, newIndex);
      return this.save();
    },
    getCardsModels: function() {
      var cardId, iCounter, object, _i, _len, _ref;
      object = new Object();
      iCounter = 0;
      _ref = this.cards.list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cardId = _ref[_i];
        object[iCounter] = Card.find(cardId);
        iCounter++;
      }
      return object;
    }
  });

  return Area;

})(Spine.Model);

Area.bind("create", function(area) {
  return area.cards = new List();
});

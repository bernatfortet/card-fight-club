var Deck,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Deck = (function(_super) {

  __extends(Deck, _super);

  function Deck() {
    Deck.__super__.constructor.apply(this, arguments);
  }

  Deck.configure('Deck', 'name', 'baseCards', 'cards');

  Deck.prototype.getTopCard = function() {
    if (!this.cards.isEmpty()) return this.cards.Dequeue();
  };

  Deck.prototype.hasCards = function() {
    return !this.cards.isEmpty();
  };

  Deck.prototype.shuffle = function() {
    return this.shuffleCurrentCardsModernFisherYates();
  };

  Deck.prototype.shuffleCurrentCardsModernFisherYates = function() {
    var array, i, j, length, swap, _results;
    length = this.cards.Count();
    array = this.cards.GetQueue();
    i = length;
    _results = [];
    while (--i) {
      j = Rand() * (i + 1) | 0;
      swap = array[i];
      array[i] = array[j];
      _results.push(array[j] = swap);
    }
    return _results;
  };

  return Deck;

})(Spine.Model);

Deck.bind("create", function(deck) {
  var card, q, _i, _len, _ref;
  q = new Queue();
  _ref = deck.baseCards;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    card = _ref[_i];
    q.Enqueue(card);
  }
  deck.cards = q;
  deck.shuffle();
  deck.shuffle();
  deck.shuffle();
  return deck.save();
});

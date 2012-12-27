var Deck,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Deck = (function(_super) {

  __extends(Deck, _super);

  function Deck() {
    Deck.__super__.constructor.apply(this, arguments);
  }

  Deck.configure('Deck', 'id', 'name', 'baseCards', 'cardsOnDeck', 'cardsOnHand', 'cardOnBoard', 'cardOnGraveyard', 'controller');

  Deck.include({
    getTopCard: function() {
      var topCard;
      if (!this.cardsOnDeck.isEmpty()) {
        topCard = this.cardsOnDeck.list[0];
        this.cardsOnDeck.Remove(topCard);
        return Card.find(topCard);
      }
    },
    setController: function(deckController) {
      this.controller = deckController;
      return this.save();
    },
    isDeckEmpty: function() {
      return this.cardsOnDeck.Count() <= 0;
    },
    shuffle: function() {
      console.log("Shuffling Deck", this.id);
      return this.shuffleWithModernFisherYates();
    },
    shuffleWithModernFisherYates: function() {
      var array, i, j, length, swap, _results;
      length = this.cardsOnDeck.Count();
      array = this.cardsOnDeck.list;
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
    addCardToArea: function(card, area) {
      switch (area) {
        case "deck":
          this.cardsOnDeck.Add(card.id);
          if (card.controller !== null) {
            card.controller.el.remove();
            return card.controller = null;
          }
          break;
        case "hand":
          return this.cardsOnHand.Add(card.id);
        case "board":
          return this.cardOnBoard.Add(card.id);
        case "graveyard":
          return this.cardOnGraveyard.Add(card.id);
      }
    },
    removeCardFromArea: function(card, area) {
      switch (area) {
        case "deck":
          return this.cardsOnDeck.Remove(card.id);
        case "hand":
          return this.cardsOnHand.Remove(card.id);
        case "board":
          return this.cardOnBoard.Remove(card.id);
        case "graveyard":
          return this.cardOnGraveyard.Remove(card.id);
      }
    },
    moveItemFromArea: function(itemIndex, newIndex, area) {
      switch (area) {
        case "deck":
          return this.cardsOnDeck.Move(itemIndex, newIndex);
        case "hand":
          return this.cardsOnHand.Move(itemIndex, newIndex);
        case "board":
          return this.cardOnBoard.Move(itemIndex, newIndex);
        case "graveyard":
          return this.cardOnGraveyard.Move(itemIndex, newIndex);
      }
    },
    getCardsModelListFromArea: function(area) {
      var iCounter, object,
        _this = this;
      object = new Object();
      iCounter = 0;
      Card.each(function(card) {
        if (card.deck.id === _this.id && card.area === area) {
          object[iCounter] = card;
          return iCounter++;
        }
      });
      return object;
    },
    createCard: function(cardJSON) {
      var cardModel;
      cardModel = Card.create({
        card_id: cardJSON.card_id,
        img: cardJSON.img,
        name: cardJSON.name,
        deck: this,
        area: "deck",
        controller: null
      });
      return this.controller.addCardToArea(cardModel, cardModel.area);
    }
  });

  return Deck;

})(Spine.Model);

Deck.bind("create", function(deck) {
  var cardIndex;
  deck.controller.item = deck;
  deck.cardsOnDeck = new List();
  deck.cardsOnHand = new List();
  deck.cardOnBoard = new List();
  deck.cardOnGraveyard = new List();
  for (cardIndex in deck.baseCards) {
    deck.createCard(deck.baseCards[cardIndex]);
  }
  deck.shuffle();
  return deck.save();
});

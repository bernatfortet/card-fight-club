var ChatController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ChatController = (function(_super) {

  __extends(ChatController, _super);

  ChatController.prototype.template = '\
		<div class="msg">\
			<span class="player">${player}:</span><span class="content">${content}</span>\
		</div>\
	';

  function ChatController() {
    this.renderChatMsg = __bind(this.renderChatMsg, this);
    this.flashInput = __bind(this.flashInput, this);    ChatController.__super__.constructor.apply(this, arguments);
  }

  ChatController.prototype.renderMsg = function(params) {
    if (params.userId) {
      params.player = User.find(params.userId).name;
    } else if (params.userName) {
      params.player = params.userName;
    }
    return this.el.find(".Conversation").append($.tmpl(this.template, params));
  };

  ChatController.prototype.flashInput = function() {
    var cssflashDuration,
      _this = this;
    this.el.find(".Flash").attr("state", "Shown");
    cssflashDuration = parseFloat(this.el.find(".Flash").css("transitionDuration")) * 1000;
    return setTimeout(function() {
      return _this.el.find(".Flash").attr("state", "HIdden");
    }, cssflashDuration);
  };

  ChatController.prototype.renderTapMsg = function(params) {
    var cardName;
    cardName = Card.find(params.cardId).name;
    params.content = " taps '" + cardName + "'";
    return this.renderMsg(params);
  };

  ChatController.prototype.renderUntapMsg = function(params) {
    var cardName;
    cardName = Card.find(params.cardId).name;
    params.content = " untapps '" + cardName + "'";
    return this.renderMsg(params);
  };

  ChatController.prototype.renderFlipUpMsg = function(params) {
    var cardName;
    cardName = Card.find(params.cardId).name;
    params.content = " flips up '" + cardName + "'";
    return this.renderMsg(params);
  };

  ChatController.prototype.renderFlipDownMsg = function(params) {
    var cardIsInHandArea, cardName;
    cardIsInHandArea = Area.find(Card.find(params.cardId).areaId).name === "hand";
    if (!cardIsInHandArea) {
      cardName = "'" + Card.find(params.cardId).name + "'";
    } else {
      cardName = "a card";
    }
    params.content = " flips down " + cardName;
    return this.renderMsg(params);
  };

  ChatController.prototype.renderDrawFromArea = function(params) {
    var areaName;
    areaName = Area.find(Card.find(params.cardId).areaId).name;
    params.content = " draws from " + areaName;
    return this.renderMsg(params);
  };

  ChatController.prototype.renderCardAreaChanges = function(params) {
    var areaNamesAreTheSame, cardIsVisible, cardName, previousAreaName;
    previousAreaName = Area.find(Card.find(params.cardId).areaId).name;
    areaNamesAreTheSame = previousAreaName === params.areaName;
    if (areaNamesAreTheSame) return;
    cardIsVisible = Card.find(params.cardId).controller.isVisible();
    if (cardIsVisible) {
      cardName = "'" + Card.find(params.cardId).name + "'";
    } else {
      cardName = "a card";
    }
    params.content = " moves " + cardName + " from " + previousAreaName + " to " + params.areaName;
    return this.renderMsg(params);
  };

  ChatController.prototype.renderChatMsg = function(params) {
    params.content = " " + params.msg;
    return this.renderMsg(params);
  };

  return ChatController;

})(Spine.Controller);

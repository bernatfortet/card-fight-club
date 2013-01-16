var SoundController,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

SoundController = (function(_super) {

  __extends(SoundController, _super);

  SoundController.prototype.template = '\
		<audio id="${soundId}">\
			<source src="${soundSource}" type="audio/${soundType}">\
		</div>\
	';

  SoundController.prototype.soundList = new Array("flipCard", "shuffleDeck", "throwDice", "receiveTurn");

  function SoundController() {
    var index;
    SoundController.__super__.constructor.apply(this, arguments);
    for (index in this.soundList) {
      this.renderSound(this.soundList[index]);
    }
  }

  SoundController.prototype.renderSound = function(soundName) {
    var params, soundType;
    soundType = "ogg";
    console.log("sounds/" + soundName + "." + soundType);
    params = {
      soundId: soundName,
      soundSource: "sounds/" + soundName + "." + soundType,
      soundType: soundType
    };
    return this.el.append($.tmpl(this.template, params));
  };

  SoundController.prototype.playSound = function(soundName) {
    return $("#" + soundName)[0].play();
  };

  return SoundController;

})(Spine.Controller);

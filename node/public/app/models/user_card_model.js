var UserCard,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

UserCard = (function(_super) {

  __extends(UserCard, _super);

  function UserCard() {
    UserCard.__super__.constructor.apply(this, arguments);
  }

  UserCard.configure('UserCard', 'id', 'data');

  UserCard.extend(Spine.Model.Local);

  return UserCard;

})(Spine.Model);

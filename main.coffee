@Decks = new Meteor.Collection('decks')
@Matches = new Meteor.Collection('matches')

@matchesStream = new Meteor.Stream('matches');
@gameStream = new Meteor.Stream('game')
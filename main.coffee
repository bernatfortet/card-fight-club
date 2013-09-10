@Players = new Meteor.Collection('players')
@Decks = new Meteor.Collection('decks')
@Cards = new Meteor.Collection('cards')
@Matches = new Meteor.Collection('matches')


@matchesStream = new Meteor.Stream('matches');
@gameStream = new Meteor.Stream('game')
import DS from 'ember-data';
import Ember from 'ember';

var User = DS.Model.extend({
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  email: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  lang: DS.attr(),
  tz: DS.attr(),

  sites: DS.hasMany('site', { async: true }),

  fullName: function() {
    var first = this.get('firstName');
    var last = this.get('lastName');

    if (Ember.isEmpty(first)) {
      return last;
    } else if (Ember.isEmpty(last)) {
      return first;
    } else {
      return first + ' ' + last;
    }
  }.property('firstName', 'lastName'),

  screenName: function() {
    var name = this.get('fullName');
    if (Ember.isEmpty(name)) {
      return this.get('id');
    } else {
      return name;
    }
  }.property('fullName')
});

export default User;

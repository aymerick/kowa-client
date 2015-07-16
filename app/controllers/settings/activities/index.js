import Ember from 'ember';

var SettingsActivitiesController = Ember.ArrayController.extend({
  sortProperties: ['createdAt']
});

export default SettingsActivitiesController;

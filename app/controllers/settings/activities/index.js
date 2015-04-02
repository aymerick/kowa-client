import Ember from 'ember';

var SettingsActivitiesController = Ember.ArrayController.extend({
  sortProperties: ['createdAt'],

  i18n: function() {
    return {
      activityEdit: this.t('activity.edit')
    };
  }.property('langService.currentLang')
});

export default SettingsActivitiesController;

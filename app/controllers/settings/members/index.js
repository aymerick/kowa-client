import Ember from 'ember';

var SettingsMembersController = Ember.ArrayController.extend({
  sortProperties: ['role'],

  i18n: function() {
    return {
      photo: this.t('photo'),
      memberEdit: this.t('member.edit')
    };
  }.property('langService.currentLang')
});

export default SettingsMembersController;

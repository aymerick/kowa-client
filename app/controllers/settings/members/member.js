import Ember from 'ember';

var SettingsMembersMemberController = Ember.Controller.extend({
  needs: [ 'settings'],
  site: Ember.computed.alias('controllers.settings.model'),

  isSaving: false,

  actions: {
    removePhoto: function() {
      this.get('model').set('photo', null);
    },

    save: function () {
      var self = this;

      this.set('isSaving', true);

      return this.get('model').save().then(function (model) {
        Ember.get(self, 'flashMessages').success(self.get('i18n').t('member.saved'));

        return model;
      }).catch(function (/* errors */) {
        Ember.get(self, 'flashMessages').danger(self.get('i18n').t('member.saveFailed'));
      }).finally(function(){
        self.set('isSaving', false);
      });
    }
  }
});

export default SettingsMembersMemberController;

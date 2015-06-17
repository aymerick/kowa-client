import Ember from 'ember';

var SettingsAccountController = Ember.Controller.extend({
  allLangs: Ember.computed.alias('langService.allLangs'),

  isSaving: false,

  actions: {
    save: function () {
      var self = this;

      this.set('isSaving', true);

      return this.get('model').save().then(function (model) {
        Ember.get(self, 'flashMessages').success('Settings saved.');

        return model;
      }).catch(function (/* errors */) {
        Ember.get(self, 'flashMessages').danger('Failed to save settings.');
      }).finally(function(){
        self.set('isSaving', false);
      });
    }
  }
});

export default SettingsAccountController;

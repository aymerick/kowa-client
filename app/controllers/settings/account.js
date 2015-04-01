import Ember from 'ember';

var SettingsAccountController = Ember.ObjectController.extend({
  allLangs: Ember.computed.alias('langService.allLangs'),

  isSaving: false,

  actions: {
    save: function () {
      var self = this;

      this.set('isSaving', true);

      return this.get('model').save().then(function (model) {
        self.get('flashes').success('Settings saved.');

        return model;
      }).catch(function (/* errors */) {
        self.get('flashes').danger('Failed to save settings.');
      }).finally(function(){
        self.set('isSaving', false);
      });
    }
  }
});

export default SettingsAccountController;

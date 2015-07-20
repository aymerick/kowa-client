import Ember from 'ember';

var SettingsHomepageController = Ember.Controller.extend({
  needs: ['settings'],
  site: Ember.computed.alias('controllers.settings.model'),
  isSaving: false,

  actions: {
    removeCover: function() {
      this.get('model').set('cover', null);
    },

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

export default SettingsHomepageController;

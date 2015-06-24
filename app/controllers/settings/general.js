import Ember from 'ember';

var SettingsGeneralController = Ember.Controller.extend({
  needs: [ 'settings'],
  site: Ember.computed.alias('controllers.settings.model'),

  isSaving: false,

  actions: {
    removeLogo: function() {
      this.get('model').set('logo', null);
    },

    removeFavicon: function() {
      this.get('model').set('favicon', null);
    },

    // called by 'select-image' modal controller
    imageSelected: function(field, image) {
      var model = this.get('model');
      model.set(field, image);
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

export default SettingsGeneralController;

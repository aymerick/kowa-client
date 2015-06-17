import Ember from 'ember';

var SettingsHomepageController = Ember.Controller.extend({
  needs: ['settings'],
  site: Ember.computed.alias('controllers.settings.model'),
  isSaving: false,

  actions: {
    removeCover: function() {
      this.get('model').set('cover', null);
    },

    // called by 'select-image' modal controller
    imageSelected: function(field, image) {
      var model = this.get('model');
      model.set(field, image);
    },

    // called by 'tinymce-editor' component
    descriptionChanged: function(newValue) {
      this.get('model').set('description', newValue);
    },

    // called by 'tinymce-editor' component
    moreDescChanged: function(newValue) {
      this.get('model').set('moreDesc', newValue);
    },

    // called by 'tinymce-editor' component
    joinTextChanged: function(newValue) {
      this.get('model').set('joinText', newValue);
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

import Ember from 'ember';

var SettingsActivitiesActivityController = Ember.Controller.extend({
  needs: [ 'settings'],
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

    save: function () {
      var self = this;

      this.set('isSaving', true);

      return this.get('model').save().then(function (model) {
        Ember.get(self, 'flashMessages').success(self.t('activity.saved'));

        return model;
      }).catch(function (/* errors */) {
        Ember.get(self, 'flashMessages').danger(self.t('activity.saveFailed'));
      }).finally(function(){
        self.set('isSaving', false);
      });
    }
  }
});

export default SettingsActivitiesActivityController;

import Ember from 'ember';

var DeleteSiteModal = Ember.Controller.extend({
  actions: {
    delete: function() {
      var self = this;
      var model = this.get('model');

      model.destroyRecord().then(function () {
        Ember.get(self, 'flashMessages').success(self.get('i18n').t('site.deleted'));

        // We reload everything to reset all controllers states
        window.location = window.location.origin;
      }).catch(function () {
        Ember.get(self, 'flashMessages').danger(self.get('i18n').t('site.deleteFailed'));
      });
    }
  }
});

export default DeleteSiteModal;

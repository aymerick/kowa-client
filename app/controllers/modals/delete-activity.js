import Ember from 'ember';

var DeleteActivityModal = Ember.Controller.extend({
  setupModal: function(masterController, activity) {
    this.set('model', activity);
  },

  actions: {
    delete: function() {
      var self = this;
      var model = this.get('model');

      model.destroyRecord().then(function () {
          Ember.get(self, 'flashMessages').success(self.get('i18n').t('activity.deleted'));
      }).catch(function () {
          Ember.get(self, 'flashMessages').danger(self.get('i18n').t('activity.deleteFailed'));
      });
    }
  }
});

export default DeleteActivityModal;

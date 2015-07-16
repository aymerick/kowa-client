import Ember from 'ember';

var DeleteImageModal = Ember.Controller.extend({
  masterController: null,

  setupModal: function(masterController, image) {
    this.set('model', image);
    this.set('masterController', masterController);
  },

  actions: {
    delete: function() {
      var self = this;
      var model = this.get('model');

      model.destroyRecord().then(function () {
          Ember.get(self, 'flashMessages').success(self.get('i18n').t('image.deleted'));
      }).catch(function () {
          Ember.get(self, 'flashMessages').danger(self.get('i18n').t('image.deleteFailed'));
          model.rollback();
          model.reload();
      });
    }
  }
});

export default DeleteImageModal;

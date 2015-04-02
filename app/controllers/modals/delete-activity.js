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
          self.get('flashes').success(self.t('activity.deleted'));
      }).catch(function () {
          self.get('flashes').danger(self.t('activity.deleteFailed'));
      });
    }
  },

  i18n: function() {
    return {
      deleteQuestion: this.t('activity.deleteQuestion'),
      'delete': this.t('delete'),
      cancel: this.t('cancel')
    };
  }.property('langService.currentLang')
});

export default DeleteActivityModal;

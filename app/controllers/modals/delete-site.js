import Ember from 'ember';

var DeleteSiteModal = Ember.Controller.extend({
  setupModal: function(masterController, site) {
    this.set('model', site);
  },

  actions: {
    delete: function() {
      var self = this;
      var model = this.get('model');

      model.destroyRecord().then(function () {
        Ember.get(self, 'flashMessages').success(self.t('site.deleted'));

        // We reload everything to reset all controllers states
        window.location = window.location.origin;
      }).catch(function () {
        Ember.get(self, 'flashMessages').danger(self.t('site.deleteFailed'));
      });
    }
  },

  i18n: function() {
    return {
      deleteQuestion: this.t('site.deleteQuestion'),
      deleteWarning: this.t('site.deleteWarning'),
      'delete': this.t('delete'),
      cancel: this.t('cancel')
    };
  }.property('langService.currentLang')
});

export default DeleteSiteModal;

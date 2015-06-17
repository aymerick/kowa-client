import Ember from 'ember';

var DeleteMemberModal = Ember.Controller.extend({
  setupModal: function(masterController, member) {
    this.set('model', member);
  },

  actions: {
    delete: function() {
      var self = this;
      var model = this.get('model');

      model.destroyRecord().then(function () {
          Ember.get(self, 'flashMessages').success(self.t('member.deleted'));
      }).catch(function () {
          Ember.get(self, 'flashMessages').danger(self.t('member.deleteFailed'));
      });
    }
  },

  i18n: function() {
    return {
      deleteQuestion: this.t('member.deleteQuestion'),
      'delete': this.t('delete'),
      cancel: this.t('cancel')
    };
  }.property('langService.currentLang')
});

export default DeleteMemberModal;

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
          Ember.get(self, 'flashMessages').success(self.get('i18n').t('member.deleted'));
      }).catch(function () {
          Ember.get(self, 'flashMessages').danger(self.get('i18n').t('member.deleteFailed'));
      });
    }
  }
});

export default DeleteMemberModal;

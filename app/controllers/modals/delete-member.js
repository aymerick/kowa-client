import Ember from 'ember';

var DeleteMemberModal = Ember.Controller.extend({
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

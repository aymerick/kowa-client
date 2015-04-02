import Ember from 'ember';
import ContentDeleteModalMixin from 'kowa/mixins/content-delete-modal';

var DeletePageModal = Ember.Controller.extend(ContentDeleteModalMixin, {
  deleteMsgOk: 'page.deleted', // This is an i18n key
  deleteMsgFail: 'page.deleteFailed', // This is an i18n key

  i18n: function() {
    return {
      deleteQuestion: this.t('page.deleteQuestion'),
      'delete': this.t('delete'),
      cancel: this.t('cancel')
    };
  }.property('langService.currentLang')
});

export default DeletePageModal;

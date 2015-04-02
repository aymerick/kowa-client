import Ember from 'ember';
import ContentDeleteModalMixin from 'kowa/mixins/content-delete-modal';

var DeletePostModal = Ember.Controller.extend(ContentDeleteModalMixin, {
  deleteMsgOk: 'post.deleted', // This is an i18n key
  deleteMsgFail: 'post.deleteFailed', // This is an i18n key

  i18n: function() {
    return {
      deleteQuestion: this.t('post.deleteQuestion'),
      'delete': this.t('delete'),
      cancel: this.t('cancel')
    };
  }.property('langService.currentLang')
});

export default DeletePostModal;

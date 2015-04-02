import Ember from 'ember';
import ContentDeleteModalMixin from 'kowa/mixins/content-delete-modal';

var DeleteEventModal = Ember.Controller.extend(ContentDeleteModalMixin, {
  deleteMsgOk: 'event.deleted', // This is an i18n key
  deleteMsgFail: 'event.deleteFailed', // This is an i18n key

  i18n: function() {
    return {
      deleteQuestion: this.t('event.deleteQuestion'),
      'delete': this.t('delete'),
      cancel: this.t('cancel')
    };
  }.property('langService.currentLang')
});

export default DeleteEventModal;

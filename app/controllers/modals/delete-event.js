import Ember from 'ember';
import ContentDeleteModalMixin from 'kowa/mixins/content-delete-modal';
import { translationMacro as t } from "ember-i18n";

var DeleteEventModal = Ember.Controller.extend(ContentDeleteModalMixin, {
  deleteMsgOk: t('event.deleted'),
  deleteMsgFail: t('event.deleteFailed')
});

export default DeleteEventModal;

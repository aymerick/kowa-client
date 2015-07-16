import Ember from 'ember';
import ContentDeleteModalMixin from 'kowa/mixins/content-delete-modal';
import { translationMacro as t } from "ember-i18n";

var DeletePostModal = Ember.Controller.extend(ContentDeleteModalMixin, {
  deleteMsgOk: t('post.deleted'),
  deleteMsgFail: t('post.deleteFailed')
});

export default DeletePostModal;

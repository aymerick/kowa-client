import Ember from 'ember';
import ContentDeleteModalMixin from 'kowa/mixins/content-delete-modal';
import { translationMacro as t } from "ember-i18n";

var DeletePageModal = Ember.Controller.extend(ContentDeleteModalMixin, {
  deleteMsgOk: t('page.deleted'),
  deleteMsgFail: t('page.deleteFailed')
});

export default DeletePageModal;

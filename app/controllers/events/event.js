import Ember from 'ember';
import ContentEditionController from 'kowa/mixins/content-edition-controller';
import { translationMacro as t } from "ember-i18n";

var EventsEventController = Ember.Controller.extend(ContentEditionController, {
  needs: ['application', 'site'],
  site: Ember.computed.alias('controllers.site.model'),

  editionRelationships: Ember.A([ 'cover' ]),
  editionDefaultTitle: t('event.untitled'),
  editionSaveMsgOk: t('event.saved'),
  editionSaveMsgErr: t('event.saveFailed'),

  contentEditionDidCommit: function(eventSaved) {
    var currentRoute = this.get('controllers.application.currentRouteName');
    if (currentRoute === 'events.new') {
      this.transitionToRoute('events.event', eventSaved);
    }
  }
});

export default EventsEventController;

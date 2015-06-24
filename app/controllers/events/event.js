import Ember from 'ember';
import ContentEditionController from 'kowa/mixins/content-edition-controller';

var EventsEventController = Ember.Controller.extend(ContentEditionController, {
  needs: ['application', 'site'],
  site: Ember.computed.alias('controllers.site.model'),

  editionRelationships: Ember.A([ 'cover' ]),
  editionDefaultTitle: 'event.untitled', // This is a i18n key

  editionSaveMsgOk: 'event.saved', // This is a i18n key
  editionSaveMsgErr: 'event.saveFailed', // This is a i18n key

  contentEditionDidCommit: function(eventSaved) {
    var currentRoute = this.get('controllers.application.currentRouteName');
    if (currentRoute === 'events.new') {
      this.transitionToRoute('events.event', eventSaved);
    }
  },

  i18n: function() {
    return {
      eventDescription: this.t('event.description'),
      eventPlace: this.t('event.place'),
      eventTitle: this.t('event.title')
    };
  }.property('langService.currentLang')
});

export default EventsEventController;

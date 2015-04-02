import Ember from 'ember';
import PaginationControllerMixin from 'kowa/mixins/pagination-controller';

var EventsController = Ember.ArrayController.extend(PaginationControllerMixin, {
  sortProperties: ['startDate'],
  sortAscending: false,

  i18n: function() {
    return {
      newEvent: this.t('event.new'),
      editEvent: this.t('event.edit')
    };
  }.property('langService.currentLang')
});

export default EventsController;

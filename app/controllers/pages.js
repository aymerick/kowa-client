import Ember from 'ember';
import PaginationControllerMixin from 'kowa/mixins/pagination-controller';

var PagesController = Ember.ArrayController.extend(PaginationControllerMixin, {
  sortProperties: ['createdAt'],

  i18n: function() {
    return {
      newPage: this.t('page.new'),
      editPage: this.t('page.edit')
    };
  }.property('langService.currentLang')
});

export default PagesController;

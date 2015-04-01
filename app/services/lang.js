import Ember from 'ember';

export default Ember.Service.extend({
  // @todo Get that list from the server. First lang is default one.
  allLangs: Ember.A([{
    id: 'en',
    name: 'English',
  }, {
    id: 'fr',
    name: 'Français',
  }]),

  userLang: null,

  browserLang: function() {
    var allLangs = this.get('allLangs');
    var defaultLang = allLangs.get('firstObject')['id'];

    var result = defaultLang;

    var navLang = window.navigator.language || window.navigator.userLanguage;
    if (!Ember.isNone(navLang)) {
      // handles both 'fr' and 'fr-FR' formats
      navLang = navLang.split('-')[0];

      if (!Ember.isNone(allLangs.findBy('id', navLang))) {
        result = navLang;
      }
    }

    return result;
  }.property(),

  currentLang: function() {
    var result = this.get('userLang');

    if (Ember.isNone(result)) {
      result = this.get('browserLang');
    }

    Ember.Logger.debug("currentLang is now: ", result);

    return result;
  }.property('userLang', 'browserLang'),

  currentLangChanged: function() {
    // updates ember-cli-i18n var
    var application = this.container.lookup('application:main');
    application.set('locale', this.get('currentLang'));
  }.observes('currentLang')
});

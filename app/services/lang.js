import Ember from 'ember';

export default Ember.Service.extend({
  userLang: null,

  browserLang: function() {
    var langs = this.get('kowa.conf.langs');

    if (langs === undefined) {
      return 'en';
    }

    var defaultLang = langs.get('firstObject')['id'];

    var result = defaultLang;

    var navLang = window.navigator.language || window.navigator.userLanguage;
    if (!Ember.isNone(navLang)) {
      // handles both 'fr' and 'fr-FR' formats
      navLang = navLang.split('-')[0];

      if (!Ember.isNone(langs.findBy('id', navLang))) {
        result = navLang;
      }
    }

    return result;
  }.property('kowa.conf.langs'),

  currentLang: function() {
    var result = this.get('userLang');

    if (Ember.isNone(result)) {
      result = this.get('browserLang');
    }

    return result;
  }.property('userLang', 'browserLang'),

  currentLangChanged: function() {
    // updates ember-cli-i18n var
    var application = this.container.lookup('application:main');
    application.set('locale', this.get('currentLang'));
  }.observes('currentLang')
});

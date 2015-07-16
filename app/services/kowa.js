import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Service.extend({
  conf: Ember.computed(function () {
    return Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
      promise: ajax('/api/configuration').then(function(response) {
        return response;
      })
    });
  }),

  browserLang: function() {
    var langs = this.get('conf.langs');

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
  }.property('conf.langs')
});

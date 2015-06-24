import LangService from 'kowa/services/lang';

export function initialize(container, application) {
  application.register('service:lang', LangService);

  application.inject('controller', 'langService', 'service:lang');
  application.inject('route', 'langService', 'service:lang');

  // setup locale
  var langService = container.lookup('service:lang');
  application.set('locale', langService.get('currentLang'));
}

export default {
  name: 'injectLangService',
  after: ['t', 'injectKowaService'], // 't' comes from ember-cli-i18n
  initialize: initialize
};

import LangService from 'kowa/services/lang';

export function initialize(container, application) {
  application.register('langService:main', LangService);

  application.inject('controller', 'langService', 'langService:main');
  application.inject('route', 'langService', 'langService:main');

  // setup locale
  var langService = container.lookup('langService:main');
  application.set('locale', langService.get('currentLang'));
}

export default {
  name: 'injectLangService',
  after: 't', // ember-cli-i18n
  initialize: initialize
};

import KowaService from 'kowa/services/kowa';

export function initialize(container, application) {
  application.register('service:kowa', KowaService, { singleton: true });

  ['controller', 'route', 'view', 'component', 'model'].forEach((factory) => {
    application.inject(factory, 'kowa', 'service:kowa');
  });
}

export default {
  name: 'injectKowaService',
  initialize: initialize
};

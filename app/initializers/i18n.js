export default {
  name: 'i18n',
  after: 'ember-i18n',

  initialize: function(_, app) {
    app.inject('controller', 'i18n', 'service:i18n');
  }
};
import Ember from 'ember';

var SignupController = Ember.Controller.extend({
  lang: Ember.computed.alias('langService.currentLang'),

  errors: null,

  haveError: Ember.computed.notEmpty('errors'),

  errorMessages: function() {
    var result = Ember.A();
    var errors = this.get('errors');

    for (var prop in errors) {
      if (errors.hasOwnProperty(prop)) {
        result.push(errors[prop]);
      }
    }

    return result;
  }.property('errors'),

  haveSeveralErrors: function() {
    return (this.get('errorMessages').get('length') > 1);
  }.property('errorMessages'),

  firstErrorMsg: function() {
    return this.get('errorMessages').get('firstObject');
  }.property('errorMessages'),

  i18n: function() {
    return {
      enterEmail: this.t('auth.enterEmail'),
      enterUsername: this.t('auth.enterUsername'),
      enterPassword: this.t('auth.enterPassword')
    };
  }.property('langService.currentLang'),

  resetFields: function() {
    var self = this;
    ['email', 'username', 'password', 'errors'].forEach(function(fieldName){
      self.set(fieldName, null);
    });
  },

  actions: {
    signup: function() {
      var data = this.getProperties('email', 'username', 'password');

      data['lang'] = this.get('langService.currentLang');

      var self = this;

      return Ember.$.ajax({
        url:         '/api/signup',
        type:        'POST',
        data:        data,
        dataType:    'json',
        contentType: 'application/x-www-form-urlencoded'
      }).then(function(response) {
        self.resetFields();

        self.transitionToRoute('signup.success', {queryParams: {email: response.user.email, username: response.user.id}});
      }, function(xhr /*, status, error */) {
        self.set('errors', xhr.responseJSON.errors);
      });
    }
  }
});

export default SignupController;

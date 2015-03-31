import Ember from 'ember';

var SignupController = Ember.Controller.extend({
  errorMsg: null,

  // i18n for attributes values and components parameters
  i18n: function() {
    return {
      enterEmail: this.t('auth.enterEmail'),
      enterUsername: this.t('auth.enterUsername'),
      enterPassword: this.t('auth.enterPassword')
    };
  }.property(), // @todo Watch current language (not logged in)

  actions: {
    signup: function() {
      var data = this.getProperties('email', 'username', 'password');
      this.set('password', null);

      var self = this;

      return Ember.$.ajax({
        url:         '/api/signup',
        type:        'POST',
        data:        data,
        dataType:    'json',
        contentType: 'application/x-www-form-urlencoded'
      }).then(function(response) {
        debugger;
        self.transitionToRoute('signup.success', {queryParams: {email: response.user.email, username: response.user.id}});
      }, function(xhr, status, error) {
        self.set('errorMsg', xhr.responseText);
      });
    }
  }
});

export default SignupController;

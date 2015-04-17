import Ember from 'ember';

var SignupErrorController = Ember.Controller.extend({
  queryParams: ['token'],
  token: null,

  emailSent: false,
  emailError: false,

  actions: {
    sendEmail: function() {
      var self = this;

      var data = {
        'token': this.get('token')
      };

      return Ember.$.ajax({
        url:         '/api/signup/sendmail',
        type:        'POST',
        data:        data,
        dataType:    'json',
        contentType: 'application/x-www-form-urlencoded'
      }).then(function(response) {
        self.set('emailSent', true);
      }, function(xhr /*, status, error */) {
        self.get('flashes').danger('Failed to send email.');

        self.set('emailError', true);
      });
    }
  }
});

export default SignupErrorController;

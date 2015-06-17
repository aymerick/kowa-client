import UnauthenticatedRoute from 'kowa/routes/unauthenticated';
import Ember from 'ember';

var SignupValidateRoute = UnauthenticatedRoute.extend({
  queryParams: {
    token: {
      refreshModel: true
    }
  },

  model: function(params) {
    var data = {
      'token': params['token']
    };

    var self = this;

    return Ember.$.ajax({
      url:         '/api/signup/validate',
      type:        'POST',
      data:        data,
      dataType:    'json',
      contentType: 'application/x-www-form-urlencoded'
    }).then(function(/* response */) {
      Ember.get(self, 'flashMessages').success('You account has been validated. You can now login.');

      // get username to prefill login form
      var username = self.parseTokenClaims(data['token'])['v'];
      self.transitionTo('login', {queryParams: {identification: username}});
    }, function(/* xhr, status, error */) {
      Ember.get(self, 'flashMessages').danger('Failed to validate your account.');

      self.transitionTo('signup.failed', {queryParams: {token: data['token']}});
    });
  },

  parseTokenClaims: function(token) {
    var result = atob(token.split('.')[1]);

    try {
      return JSON.parse(result);
    } catch (e) {
      return result;
    }
  }
});

export default SignupValidateRoute;

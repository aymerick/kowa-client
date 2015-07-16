import Ember from 'ember';

var LoginController = Ember.Controller.extend({
  actions: {
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password');
      this.set('password', null);

      this.get('session').authenticate('simple-auth-authenticator:oauth2-password-grant', credentials);
    }
  }
});

export default LoginController;

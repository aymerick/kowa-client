import AuthenticatedRoute from 'kowa/routes/authenticated';

var SettingsAccountRoute = AuthenticatedRoute.extend({
  model: function() {
    return this.get('session.currentUser');
  }
});

export default SettingsAccountRoute;

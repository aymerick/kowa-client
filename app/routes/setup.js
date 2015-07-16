import AuthenticatedRoute from 'kowa/routes/authenticated';

var SetupRoute = AuthenticatedRoute.extend({
  // this is a fresh new model
  model: function() {
    var self = this;

    return this.get('session.currentUser').then(function(currentUser) {
      return self.store.createRecord('site', { user: currentUser });
    });
  },

  actions: {
    willTransition: function(/* transition */) {
      var controller = this.get('controller');
      controller.resetProperties();

      var model = controller.get('model');
      if (model.get('isDirty')) {
        // setup was cancelled, so delete stale site
        model.deleteRecord();
      }
    }
  }
});

export default SetupRoute;

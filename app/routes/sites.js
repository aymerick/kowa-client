import Ember from 'ember';
import AuthenticatedRoute from 'kowa/routes/authenticated';

var SitesRoute = AuthenticatedRoute.extend({
  model: function() {
    var self = this;

    return this.session.get('currentUser').then(function(currentUser){
      // setup locale
      self.get('langService').set('userLang', currentUser.get('lang'));

      // observe user locale change
      Ember.addObserver(currentUser, 'lang', function() {
        self.get('langService').set('userLang', currentUser.get('lang'));
      });

      return currentUser.get('sites');
    });
  },

  afterModel: function(sites, transition) {
    if (!transition.params.site) {
      var firstSite = sites.get('lastObject');
      if (firstSite) {
        // redirects / to /:site_id
        this.transitionTo('site', firstSite);
      }
      else {
        // no site yet, so redirects to /setup
        this.transitionTo('setup');
      }
    }
  }
});

export default SitesRoute;

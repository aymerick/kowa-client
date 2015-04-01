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
    // redirects / to /:site_id
    if (!transition.params.site) {
      var firstSite = sites.get('lastObject');
      if (firstSite) {
        this.transitionTo('site', firstSite);
      }
    }
  }
});

export default SitesRoute;

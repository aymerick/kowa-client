import Ember from 'ember';

var SiteController = Ember.Controller.extend({
  needs: ['sites'],
  userSites: Ember.computed.alias('controllers.sites.model'),
  selectedSite: Ember.computed.oneWay('model'),

  hideNav: Ember.computed.match('currentPath', /(error|login|forgotten)/),

  selectedSiteChanged: function() {
    if (this.get('selectedSite').get('id') !== this.get('model').get('id')) {
      // hard load to reset all controllers
      // @todo Find a better way to do that !
      window.location = window.location.origin + "/" + this.get('selectedSite').get('id');
    }
  }.observes('selectedSite'),

  viewSiteUrl: function() {
    return this.get('selectedSite.baseUrl');
  }.property('selectedSite.baseUrl')
});

export default SiteController;

import Ember from 'ember';
import SimpleAuthApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

var ApplicationRoute = Ember.Route.extend(SimpleAuthApplicationRouteMixin, {
  i18n: Ember.inject.service(),

  afterModel: function() {
    var self = this;

    // set locale to browser language, if not authenticated yet
    this.get('kowa.conf').then(function(){
      if (!self.get('session.isAuthenticated')) {
        self.set('i18n.locale', self.get('kowa.browserLang'));
      }
    });
  },

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    },

    sessionAuthenticationFailed: function(/* error */) {
      this.get('controller').get('flashMessages').danger('Authentication failed.');
    },

    openModal: function(name, masterController, arg) {
      name = 'modals/' + name;

      var controller = this.controllerFor(name, true);
      if (controller && (Ember.typeOf(controller.setupModal) === 'function')) {
        controller.setupModal(masterController, arg);
      }

      this.render(name, {
        into: 'application',
        outlet: 'modal'
      });
    },

    closeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});

export default ApplicationRoute;

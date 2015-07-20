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

  renderModal: function(name) {
    this.render(name, {
      into: 'application',
      outlet: 'modal'
    });
  },

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    },

    sessionAuthenticationFailed: function(/* error */) {
      this.get('controller').get('flashMessages').danger('Authentication failed.');
    },

    openModalDelete: function(name, model, nextRoute) {
      name = 'modals/' + name;

      var controller = this.controllerFor(name, true);
      if (controller) {
        controller.set('model', model);

        if (!Ember.isNone(nextRoute)) {
          controller.set('nextRoute', nextRoute);
        }
      }

      this.renderModal(name);
    },

    openModalSelectImage: function(site, model, field) {
      var name = 'modals/select-image';

      var controller = this.controllerFor(name, true);
      if (controller) {
        controller.setupModalSelectImage(site, model, field);
      }

      this.renderModal(name);
    },

    setupModalDeleteFileField: function(model, field) {
      var name = 'modals/delete-file-field';

      var controller = this.controllerFor(name, true);
      if (controller) {
        controller.setupModalDeleteFileField(model, field);
      }

      this.renderModal(name);
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

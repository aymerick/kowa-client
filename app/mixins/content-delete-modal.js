import Ember from 'ember';

var ContentDeleteModalMixin = Ember.Mixin.create({
  nextRoute: null,
  deleteMsgOk: null,
  deleteMsgFail: null,

  setupModal: function(masterController, nextRoute) {
    this.set('model', masterController.get('model'));
    this.set('nextRoute', nextRoute);
  },

  actions: {
    delete: function() {
      var self = this;
      var model = this.get('model');

      model.destroyRecord().then(function () {
          Ember.get(self, 'flashMessages').success(self.t(self.get('deleteMsgOk')));

          var nextRoute = self.get('nextRoute');
          if (!Ember.isNone(nextRoute)) {
            self.transitionToRoute(nextRoute);
          }
      }).catch(function () {
          Ember.get(self, 'flashMessages').danger(self.t(self.get('deleteMsgFail')));
          model.rollback();
          model.reload();
      });
    }
  }
});

export default ContentDeleteModalMixin;

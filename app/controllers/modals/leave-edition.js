import Ember from 'ember';

var LeaveEditionModal = Ember.ObjectController.extend({
  masterController: null,
  haltedTransition: null,

  setupModal: function(masterController, haltedTransition) {
    this.set('model', masterController.get('model'));
    this.set('masterController', masterController);
    this.set('haltedTransition', haltedTransition);
  },

  actions: {
    confirm: function() {
      var model = this.get('model');
      var masterController = this.get('masterController');
      var haltedTransition = this.get('haltedTransition');

      if (Ember.isNone(haltedTransition) || Ember.isNone(masterController) || Ember.isNone(model)) {
          this.get('flashes').danger('An error occured.');

          // bubble the action
          return true;
      }

      masterController.rollbackEdition();

      haltedTransition.retry();
    }
  }
});

export default LeaveEditionModal;

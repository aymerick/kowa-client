import Ember from 'ember';

var DeleteFileFieldModal = Ember.Controller.extend({
  masterModel: null,
  masterField: null,

  setupModal: function(masterController, masterField) {
    var masterModel = masterController.get('model');

    this.set('masterModel', masterModel);
    this.set('masterField', masterField);

    this.set('model', masterModel.get(masterField).get('content'));
  },

  actions: {
    delete: function() {
      var model = this.get('model');

      var masterModel = this.get('masterModel');
      var masterField = this.get('masterField');

      var self = this;

      model.destroyRecord().then(function () {
        masterModel.set(masterField, null);

        masterModel.save().then(function() {
          Ember.get(self, 'flashMessages').success(self.t('file.deleted'));
        })
      }).catch(function () {
        Ember.get(self, 'flashMessages').danger(self.t('file.deleteFailed'));
        model.rollback();
        model.reload();
      });
    }
  },

  i18n: function() {
    return {
      deleteQuestion: this.t('file.deleteQuestion'),
      'delete': this.t('delete'),
      cancel: this.t('cancel')
    };
  }.property('langService.currentLang')
});

export default DeleteFileFieldModal;

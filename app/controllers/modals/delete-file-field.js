import Ember from 'ember';

var DeleteFileFieldModal = Ember.Controller.extend({
  masterModel: null,
  modelField: null,

  setupModalDeleteFileField: function(masterModel, modelField) {
    this.set('masterModel', masterModel);
    this.set('modelField', modelField);

    this.set('model', masterModel.get(modelField).get('content'));
  },

  actions: {
    delete: function() {
      var model = this.get('model');

      var masterModel = this.get('masterModel');
      var modelField = this.get('modelField');

      var self = this;

      model.destroyRecord().then(function () {
        masterModel.set(modelField, null);

        masterModel.save().then(function() {
          Ember.get(self, 'flashMessages').success(self.get('i18n').t('file.deleted'));
        });
      }).catch(function () {
        Ember.get(self, 'flashMessages').danger(self.get('i18n').t('file.deleteFailed'));
        model.rollback();
        model.reload();
      });
    }
  }
});

export default DeleteFileFieldModal;

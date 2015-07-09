import Ember from 'ember';
import UploadJob from 'kowa/services/upload-job';

var SettingsGeneralController = Ember.Controller.extend({
  needs: [ 'settings'],
  site: Ember.computed.alias('controllers.settings.model'),

  membershipUploadUrl: function() {
    return "/api/files/upload?kind=membership&site=" + this.get('site').get('id');
  }.property('site'),

  isSaving: false,

  actions: {
    removeLogo: function() {
      this.get('model').set('logo', null);
    },

    removeFavicon: function() {
      this.get('model').set('favicon', null);
    },

    // called by 'select-image' modal controller
    imageSelected: function(field, image) {
      var model = this.get('model');
      model.set(field, image);
    },

    save: function () {
      var self = this;

      this.set('isSaving', true);

      return this.get('model').save().then(function (model) {
        Ember.get(self, 'flashMessages').success('Settings saved.');

        return model;
      }).catch(function (/* errors */) {
        Ember.get(self, 'flashMessages').danger('Failed to save settings.');
      }).finally(function(){
        self.set('isSaving', false);
      });
    },

    uploadMembership: function(file) {
      var job = new UploadJob({
        url: this.get('membershipUploadUrl'),
        file: file
      });

      var self = this;

      job.on('uploadProgress', function(/* val */) {
        // @todo uploadProgress
      });

      job.on('didUpload', function(response) {
        // push uploaded file
        var recordData = self.store.normalize('file', response.file);
        var fileRecord = self.store.push('file', recordData);

        // update site
        self.get('site').set('membership', fileRecord);

        Ember.get(self, 'flashMessages').success(self.t('file.saved'));
      });

      this.uploader.schedule(job);
    }
  }
});

export default SettingsGeneralController;

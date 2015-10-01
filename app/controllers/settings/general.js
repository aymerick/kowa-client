import Ember from 'ember';
import UploadJob from 'kowa/services/upload-job';

var SettingsGeneralController = Ember.Controller.extend({
  needs: [ 'settings'],
  site: Ember.computed.alias('controllers.settings.model'),

  themeConfPalettes: function() {
    var themes = this.get('kowa.conf.themes');

    var theme = themes.findBy('id', this.get('site.theme'));
    if (!Ember.isNone(theme)) {
      return theme.palettes;
    }

    return null;
  }.property('site.theme'),

  themeSettings: function() {
    var site = this.get('site');

    var result = site.get('themeSettings').find(function(themeSettings) {
      return themeSettings.get('theme') === site.get('theme');
    });

    if (Ember.isNone(result) && !Ember.isNone(this.get('themeConfPalettes'))) {
      result = this.store.createRecord('site-theme-setting', { theme: site.get('theme') });

      // set fake attribute
      result.set('site', site);
    }

    return result;
  }.property('site.theme'),

  membershipUploadUrl: function() {
    return "/api/files/upload?kind=membership&site=" + this.get('site').get('id');
  }.property('site'),

  isSaving: false,

  haveCustomDomain: function() {
    return !Ember.isBlank(this.get('model.customDomain'));
  }.property('model.customDomain'),

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

      // save site model
      return this.get('model').save().then(function (siteModel) {
        var settings = self.get('themeSettings');
        if (!Ember.isNone(settings)) {
          // save theme settings model
          return settings.save().then(function () {
            Ember.get(self, 'flashMessages').success('Settings saved.');
            return siteModel;
          });
        } else {
          Ember.get(self, 'flashMessages').success('Settings saved.');
          return siteModel;
        }
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

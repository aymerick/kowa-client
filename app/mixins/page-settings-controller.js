import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

var PageSettingsControllerMixin = Ember.Mixin.create({
  needs: ['settings'],
  site: Ember.computed.alias('controllers.settings.model'),

  isSaving: false,

  pageSettingsSaveMsgOk: t('pageSettings.saved'),
  pageSettingsSaveMsgErr: t('pageSettings.saveFailed'),

  actions: {
    removeCover: function() {
      this.get('model').set('cover', null);
    },

    // called by 'select-image' modal controller
    imageSelected: function(field, image) {
      var model = this.get('model');
      model.set(field, image);
    },

    save: function () {
      var self = this;
      var model = this.get('model');
      var wasNew = model.get('isNew');

      this.set('isSaving', true);

      return model.save().then(function (savedModel) {
        if (wasNew) {
          // add to relationship
          self.get('site').get('pageSettings').addObject(savedModel);
        }

        Ember.get(self, 'flashMessages').success(self.get('pageSettingsSaveMsgOk'));

        return savedModel;
      }).catch(function (/* errors */) {
        Ember.get(self, 'flashMessages').danger(self.get('pageSettingsSaveMsgErr'));
      }).finally(function(){
        self.set('isSaving', false);
      });
    }
  }
});

export default PageSettingsControllerMixin;

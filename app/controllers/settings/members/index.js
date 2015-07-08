import Ember from 'ember';

var SettingsMembersController = Ember.ArrayController.extend({
  sortProperties: ['order', 'createdAt'],

  actions: {
    reorderItems: function(newOrder) {
      var order = 1;

      newOrder.forEach(function(member){
        member.set('order', order);
        // @todo Remove that individual save
        member.save()
        order++;
      });

      // @todo Save all orders with a single request
    }
  },

  i18n: function() {
    return {
      photo: this.t('photo'),
      memberEdit: this.t('member.edit')
    };
  }.property('langService.currentLang')
});

export default SettingsMembersController;

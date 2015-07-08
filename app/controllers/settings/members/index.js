import Ember from 'ember';

var SettingsMembersController = Ember.ArrayController.extend({
  sortProperties: ['order', 'createdAt'],

  needs: ['settings'],
  site: Ember.computed.alias('controllers.settings.model'),

  actions: {
    reorderItems: function(newOrder) {
      var ids = [ ];
      var order = 1;

      newOrder.forEach(function(member){
        ids.push(member.get('id'));

        member.set('order', order);
        order++;
      });

      var url = '/api/members/order?site=' + this.get('site').get('id');
      var self = this;

      Ember.$.ajax({
        url:         url,
        type:        'PUT',
        data:        JSON.stringify(ids),
        dataType:    'json',
        contentType: 'application/json'
      }).then(function(/* response */) {
        // NOOP
      }, function(/*xhr , status, error */) {
        Ember.get(self, 'flashMessages').danger('Failed to save members order.');
      });
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

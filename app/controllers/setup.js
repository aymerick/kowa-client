import Ember from 'ember';

var SetupController = Ember.Controller.extend({
  queryParams: ['backSite'],
  backSite: null,

  isSaving: false,

  errors: null,

  haveError: Ember.computed.notEmpty('errors'),

  resetProperties: function() {
    this.set('errors', null);
  },

  errorMessages: function() {
    var result = Ember.A();
    var errors = this.get('errors');

    for (var prop in errors) {
      if (errors.hasOwnProperty(prop)) {
        result.push(errors[prop]);
      }
    }

    return result;
  }.property('errors'),

  haveSeveralErrors: function() {
    return (this.get('errorMessages').get('length') > 1);
  }.property('errorMessages'),

  firstErrorMsg: function() {
    return this.get('errorMessages').get('firstObject');
  }.property('errorMessages'),

  actions: {
    // called by 'tinymce-editor' component
    descriptionChanged: function(newValue) {
      this.get('model').set('description', newValue);
    },

    createSite: function () {
      var self = this;

      this.set('isSaving', true);

      return this.get('model').save().then(function (model) {
        self.get('flashes').success('New site created.');

        // Redirect to new site settings
        // (we reload everything to reset all controllers states)
        window.location = window.location.origin + "/" + model.get('id') + "/settings/general";

        return model;
      }).catch(function (e) {
        self.set('errors', e.responseJSON.errors);
      }).finally(function(){
        self.set('isSaving', false);
      });
    }
  }
});

export default SetupController;

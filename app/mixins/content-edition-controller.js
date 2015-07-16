import Ember from 'ember';

// All that mess simply because of that issue:
//  https://github.com/emberjs/data/issues/1308
var ContentEditionControllerMixin = Ember.Mixin.create({
  isDirty: false,
  isSaving: false,

  nothingChanged: Ember.computed.not('isDirty'),
  cannotSave: Ember.computed.or('nothingChanged', 'isSaving'),
  cannotDelete: Ember.computed.or('model.isNew', 'isSaving'),
  cannotUpdate: Ember.computed.or('model.isNew', 'isSaving'),

  watchProperties: Ember.A([ ]),

  // properties setup in controller
  editionRelationships: Ember.A([ ]),
  editionDefaultTitle: null,
  editionSaveMsgOk: null,
  editionSaveMsgErr: null,

  setupEdition: function(fields) {
    this.resetEdition();

    if (!Ember.isNone(fields)) {
      this.set('editionRelationships', fields);
    }

    var model = this.get('model');
    var self = this;

    this.get('editionRelationships').forEach(function (field) {
      // eg: cover => previousCover
      self.set(self.previousFieldName(field), model.get(field));
    });

    this.setWatchProperties();
    this.addDirtinessObserving();
    this.synchronizeIsDirtyProperty();
  },

  resetEdition: function() {
    this.removeDirtinessObserving();

    this.set('watchProperties', Ember.A([ ]));
    this.set('isDirty', false);
  },

  commitEdition: function(okMsg, errorMsg) {
    var model = this.get('model');

    if (this.get('editionDefaultTitle') !== null) {
      // set a default title
      if (!model.get('title')) {
          model.set('title',this.get('editionDefaultTitle'));
      }
    }

    if (!this.get('isDirty')) {
      // This should never happen
      return;
    }

    // persist on server
    var self = this;

    this.set('isSaving', true);

    model.save().then(function (recordSaved) {
      Ember.get(self, 'flashMessages').success(okMsg);

      self.get('editionRelationships').forEach(function (field) {
        // eg: self.set('previousCover', model.get('cover'));
        self.set(self.previousFieldName(field), model.get(field));
      });

      if (Ember.typeOf(self.contentEditionDidCommit) === 'function') {
        // call hook
        self.contentEditionDidCommit(recordSaved);
      }

      return recordSaved;
    }).catch(function () {
      Ember.get(self, 'flashMessages').danger(errorMsg);
    }).finally(function(){
      self.set('isSaving', false);
    });
  },

  rollbackEdition: function() {
    var model = this.get('model');

    if (model.get('isNew')) {
      model.deleteRecord();
    } else {
      var self = this;
      this.get('editionRelationships').forEach(function(field) {
        // eg: model.set('cover', self.get('previousCover'))
        model.set(field, self.previousField(field));
      });

      model.rollback();
    }
  },

  previousField: function(fieldName) {
    return this.get(this.previousFieldName(fieldName));
  },

  previousFieldName: function(fieldName) {
    return ('previous' + fieldName.classify());
  },

  editionFieldChanged: function() {
    var model = this.get('model');
    var self  = this;

    return this.get('editionRelationships').any(function(field) {
      var previousValue = self.previousField(field);
      var value = model.get(field);

      return ((Ember.isNone(previousValue) && !Ember.isNone(value)) ||
              (!Ember.isNone(previousValue) && Ember.isNone(value)) ||
              (!Ember.isNone(previousValue) && !Ember.isNone(value) && (previousValue.get('id') !== value.get('id'))));
    });
  },

  synchronizeIsDirtyProperty: function() {
    var model = this.get('model');
    var currentDirtinessValue = model.get('isDirty') || model.get('isNew') || this.editionFieldChanged();

    // debugger;
    // model.changedAttributes();

    this.set('isDirty', currentDirtinessValue);
  },

  setWatchProperties: function() {
    var self = this;
    var watchProperties = Ember.A([ 'model.isDirty', 'model.isNew' ]);

    this.get('editionRelationships').forEach(function(field) {
      watchProperties.pushObject('model.' + field);
      watchProperties.pushObject(self.previousFieldName(field));
    });

    this.set('watchProperties', watchProperties);
  },

  addDirtinessObserving: function() {
    var self = this;

    this.get('watchProperties').forEach(function(watchProp) {
      self.addObserver(watchProp, self, 'synchronizeIsDirtyProperty');
    });
  },

  removeDirtinessObserving: function() {
    var self = this;

    this.get('watchProperties').forEach(function(watchProp) {
      self.removeObserver(watchProp, self, 'synchronizeIsDirtyProperty');
    });
  },

  actions: {
    // called by 'select-image' modal controller
    imageSelected: function(field, image) {
      this.set(field, image);
    },

    removeCover: function() {
      this.get('model').set('cover', null);
    },

    bodyChanged: function(newValue) {
      this.get('model').set('body', newValue);
    },

    saveContent: function() {
      // save
      this.commitEdition(this.get('editionSaveMsgOk'), this.get('editionSaveMsgErr'));
    }
  }
});

export default ContentEditionControllerMixin;

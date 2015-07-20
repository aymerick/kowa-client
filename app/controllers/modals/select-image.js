import Ember from 'ember';
import PaginationControllerMixin from 'kowa/mixins/pagination-controller';

var SelectImageModal = Ember.ArrayController.extend(PaginationControllerMixin, {
  itemController: 'settings/image',

  sortProperties: ['createdAt'],
  sortAscending: false,

  selectedImage: null,

  nothingSelected: Ember.computed.not('selectedImage'),

  masterModel: null,
  modelField: null,

  setupModalSelectImage: function(site, masterModel, modelField) {
    var params = { 'site': site.get('id'), 'page': 1, 'perPage': 16 };
    this.setupPagination('image', params);

    this.set('model', this.store.filter('image', params, function (image) {
      return image.get('site.id') === site.get('id');
    }));

    this.set('masterModel', masterModel);
    this.set('modelField', modelField);
  },

  actions: {
    selectImage: function (image) {
      this.set('selectedImage', image);
    },

    save: function() {
      var masterModel = this.get('masterModel');
      var modelField = this.get('modelField');

      masterModel.set(modelField, this.get('selectedImage'));
    }
  }
});

export default SelectImageModal;

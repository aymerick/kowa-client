import Ember from 'ember';

var ImageView = Ember.View.extend({
  tagName: 'li',
  classNames: ['thumbnail', 'images-grid-item'],
  classNameBindings: ['isSelected', 'content.isUploading'],

  // @todo THIS IS BROKEN
  isSelected: function() {
    var selectedImg = this.get('controller.parentController.selectedImage');
    return (selectedImg && selectedImg.get('id') === this.get('content.model.id'));
  }.property('controller.parentController.selectedImage'),

  // @todo THIS IS BROKEN
  click: function() {
    var imageController = this.get('content');
    if (!imageController.get('isUploading')) {
      this.get('controller').send('selectImage', imageController.get('model'));
    }
  }
});

export default ImageView;

import EmberUploader from 'ember-uploader';

var FileUploader = EmberUploader.FileField.extend({
  multiple: false,
  accept: 'application/pdf,text/plain',

  filesDidChange: (function() {
    var files = this.get('files');

    for (var i = 0; i < files.length; i++) {
      this.sendAction('upload', files[i], i);
    }
  }).observes('files')
});

export default FileUploader;

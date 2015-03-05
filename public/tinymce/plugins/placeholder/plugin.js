// Adapted from: https://github.com/mohansandesh/tinymce-placeholder
tinymce.PluginManager.add('placeholder', function(editor) {
  editor.on('init', function() {
    var label = new Label;

    onBlur();

    tinymce.DOM.bind(label.el, 'click', onFocus);
    editor.on('focus', onFocus);
    editor.on('blur', onBlur);

    function onFocus(){
      label.hide();
      tinyMCE.execCommand('mceFocus', false, editor);
    }

    function onBlur(){
      if (editor.getContent() == '') {
        label.show();
      } else {
            label.hide();
      }
    }
  });

  var Label = function(){
    // Create label el
    this.text = editor.getElement().getAttribute("placeholder");
    this.contentAreaContainer = editor.getContentAreaContainer();

    // tinymce.DOM.setStyle(this.contentAreaContainer, 'position', 'relative');

    attrs = { 'class': 'placeholder' };
    this.el = tinymce.DOM.add(this.contentAreaContainer, "label", attrs, this.text);
  }

  Label.prototype.hide = function(){
    tinymce.DOM.setStyle( this.el, 'display', 'none' );
  }

  Label.prototype.show = function(){
    tinymce.DOM.setStyle( this.el, 'display', '' );
  }
});

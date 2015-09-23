import Ember from "ember";

var TinyMCEEditor = Ember.Component.extend({
  classNames: ['tinymce-editor'],
  classNameBindings: ['fillHeight'],

  value: null,
  updatingValue: false,
  editor: null,

  // settings
  height: null,

  // resize handling
  $window: null,
  resizeHandler: null,

  // callback to setup editor
  setupEditor: function(editor) {
    this.set('editor', editor);

    var self = this;

    // bind change event
    editor.on('change', function() {
      Ember.Logger.debug('=====================');
      Ember.Logger.debug('[EVENT] editor.change');
      self.editorValueDidChange(editor.getContent());
    });

    // bind keyup event
    editor.on('keyup', function() {
      Ember.Logger.debug('=====================');
      Ember.Logger.debug('[EVENT] editor.keyup');
      self.editorValueDidChange(editor.getContent());
    });
  },

  // initialize editor when inserted
  initEditor: function() {
    var settings = {
      theme_url: '/tinymce/themes/modern/theme.min.js',
      skin_url: '/tinymce/skins/lightgray',
      external_plugins: {
        hr: '/tinymce/plugins/hr/plugin.min.js',
        link: '/tinymce/plugins/link/plugin.min.js',
        paste: '/tinymce/plugins/paste/plugin.min.js',
        placeholder: '/tinymce/plugins/placeholder/plugin.js'
      },
      content_css : [
         '/assets/bootstrap.css',
         '/assets/vendor.css',
         '/assets/kowa.css'
      ],
      paste_as_text: true,
      menubar: false,
      statusbar : false,
      resize: false,
      toolbar: 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link | hr',
      // @todo i18n
      language_url: "/tinymce/locales/fr_FR.js",
      setup: Ember.run.bind(this, this.setupEditor)
    };

    if (this.get('fillHeight')) {
      settings = Ember.merge(settings, {
        height: '100%',
        body_class: 'full-size'
      });

      this.resizeHandler = Ember.run.bind(this, this.onResize);

      this.$window = Ember.$(window);
      this.$window.on("resize", this.resizeHandler);
      this.resizeHandler();
    }
    else if (this.get('height') !== null) {
      settings = Ember.merge(settings, {
        height: this.get('height')
      });
    }

    this.$('textarea').tinymce(settings);
  }.on('didInsertElement'),

  // remove editor when destroyed
  removeEditor: function(){
    if (this.resizeHandler !== null) {
      this.$window.off("resize", this.resizeHandler);
    }

    this.get('editor').destroy();
  }.on('willDestroyElement'),

  // callback when value changed in editor
  editorValueDidChange: function(newValue) {
    var self = this;

    this.updateValue(function() {
      Ember.Logger.debug('[VALUE RESET] ', newValue);
      self.set('value', newValue);
    });
  },

  // called when updating value because of a change in editor
  updateValue: function(callback) {
    this.updatingValue = true;
    callback();
    this.updatingValue = false;
  },

  // callback when value changed outside editor
  valueDidChange: function() {
    if (this.updatingValue) {
      Ember.Logger.debug('[VALUE CHANGED] - CANCELED');
      return;
    }

    var content = this.get("value");
    if (Ember.isPresent(content)) {
      Ember.Logger.debug('[EDITOR RESET] ', content);
      this.get("editor").setContent(content);
    }
  }.observes("value"),

  // callback when window size changed
  onResize: function() {
    var toolBarHeight = this.$('.mce-toolbar-grp').outerHeight();

    this.$('.mce-edit-area').css('top', toolBarHeight);
  }
});

export default TinyMCEEditor;

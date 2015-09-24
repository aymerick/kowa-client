/* globals CKEDITOR */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ck-editor'],
  classNameBindings: ['fillHeight'],

  editor: null,
  updatingValue: false,

  // settings
  height: null,
  fillHeight: false,

  // resize handling
  $window: null,
  resizeHandler: null,

  didInsertElement() {
    let settings = {
      extraPlugins: 'justify',
      removePlugins: 'elementspath', // hide bottom bar
      toolbarGroups: [
    		{ name: 'clipboard', groups: [ 'undo' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'paragraph', groups: [ 'align' ] },
        { name: 'paragraph', groups: [ 'list' ] },
    		{ name: 'links', groups: [ 'links' ] },
    		{ name: 'insert', groups: [ 'insert' ] }
    	],
      removeButtons: 'Cut,Copy,PasteFromWord,PasteText,Paste,Subscript,Superscript,Anchor,Image,SpecialChar,Table',
      resize_enabled: false,
      language: 'fr', // @todo i18n
      forcePasteAsPlainText: true
    };

    if (this.get('fillHeight')) {
      settings = Ember.merge(settings, {
        height: '100%',
      });

      this.resizeHandler = Ember.run.bind(this, this.onResize);

      this.$window = Ember.$(window);
      this.$window.on("resize", this.resizeHandler);
    }
    else if (this.get('height') !== null) {
      settings = Ember.merge(settings, {
        height: this.get('height')
      });
    }

    let textarea = this.element.querySelector('.editor');
    this.editor = CKEDITOR.replace(textarea, settings);

    this.editor.on('instanceReady', () => {
      if (this.get('fillHeight')) {
        this.resizeHandler();
      }
    });

    this.editor.on('change', (e) => {
      if (this.get('updatingValue')) {
        return;
      }

      this.sendAction('on-change', e.editor.getData());
    });
  },

  willDestroyElement() {
    this.editor.destroy();
    this.editor = null;
  },

  // callback when value id changed
  valueIdDidChange: function() {
    if (this.editor) {
      if (this.get('updatingValue')) {
        return;
      }

      this.set('updatingValue', true);
      this.editor.setData(this.get('value'), {
        callback: () => {
          this.set('updatingValue', false);
        }
      });
    }
  }.observes("value-id"),

  // callback when window size changes
  onResize: function() {
    let innerHeight = this.$('.cke_inner').outerHeight();
    let topHeight = this.$('.cke_top').outerHeight();
    let bottomHeight = this.$('.cke_bottom').outerHeight(); // should be zero, as the bottom bar is not displayed

    // resize editor to fill height
    this.editor.resize('100%', innerHeight - topHeight - bottomHeight, true, true);
  }
});

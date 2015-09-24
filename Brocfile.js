/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberApp({
  // needed since ember 1.10.0
  // cf. https://github.com/rwjblue/components-in-subdirs/commit/78e7ed2d072f42d9cf0fd3d9fc2376f106ab762e
  vendorFiles: {
    'handlebars.js': null
  },
  emberCliFontAwesome: { includeFontAwesomeAssets: false },
  outputPaths: {
    app: {
      css: {
        'app': '/assets/kowa.css',
        'bootstrap': '/assets/bootstrap.css'
      }
    }
  },
  fingerprint: {
    exclude: ['favicon.png', 'assets/ckeditor'],
  }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// Bootstrap
app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.js');
app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2', { destDir: 'fonts/bootstrap' });
app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff', { destDir: 'fonts/bootstrap' });
app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf', { destDir: 'fonts/bootstrap' });
app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot', { destDir: 'fonts/bootstrap' });
app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.svg', { destDir: 'fonts/bootstrap' });

// Font awesome
app.import(app.bowerDirectory + "/font-awesome/css/font-awesome.css");
app.import(app.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.eot", { destDir: "fonts" });
app.import(app.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.svg", { destDir: "fonts" });
app.import(app.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.ttf", { destDir: "fonts" });
app.import(app.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.woff", { destDir: "fonts" });
app.import(app.bowerDirectory + "/font-awesome/fonts/fontawesome-webfont.woff2", { destDir: "fonts" });
app.import(app.bowerDirectory + "/font-awesome/fonts/FontAwesome.otf", { destDir: "fonts" });

// Moment locales
app.import(app.bowerDirectory + "/moment/locale/fr.js");

// Twix (moment range formatter)
app.import(app.bowerDirectory + "/twix/bin/twix.min.js")
app.import(app.bowerDirectory + "/twix/bin/locale.min.js")

// CodeMirror
app.import(app.bowerDirectory + '/codemirror/lib/codemirror.css');
app.import(app.bowerDirectory + '/codemirror/lib/codemirror.js');
app.import(app.bowerDirectory + '/codemirror/mode/markdown/markdown.js');
app.import(app.bowerDirectory + '/codemirror/mode/gfm/gfm.js');
app.import(app.bowerDirectory + '/codemirror/addon/mode/overlay.js');
app.import(app.bowerDirectory + '/codemirror/addon/display/placeholder.js');

app.import(app.bowerDirectory + '/ember-cli-codemirror-shim/codemirror-shim.js', {
  exports: { 'codemirror': ['default'] }
});

// CKEditor
var ckeditorDirs = importCKEditor(app, pickFiles);

function importCKEditor(app, pickFiles) {
  var result = [ ];

  app.import(app.bowerDirectory + '/ckeditor/ckeditor.js');

  result.push(pickFiles(app.bowerDirectory + '/ckeditor', {
    srcDir: '/',
    destDir: '/assets/ckeditor'
  }));

  return result;
}

module.exports = app.toTree(ckeditorDirs);

import Ember from 'ember';
import ContentEditionController from 'kowa/mixins/content-edition-controller';
import ENV from '../../config/environment';

var PagesPageController = Ember.ObjectController.extend(ContentEditionController, {
  editionRelationships: Ember.A([ 'cover' ]),
  editionDefaultTitle: '(Untitled)',

  editionSaveMsgOk: 'Page saved.',
  editionSaveMsgErr: 'Failed to save page.',

  showContentFormat: ENV.APP.SHOW_CONTENT_FORMAT,

  // @todo Get that list from the server
  allFormats: [
    { name: "Rich Text", id: 'html' },
    { name: "Markdown", id: 'md' }
  ]
});

export default PagesPageController;

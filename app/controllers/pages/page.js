import Ember from 'ember';
import ContentEditionController from 'kowa/mixins/content-edition-controller';
import { translationMacro as t } from "ember-i18n";

var PagesPageController = Ember.Controller.extend(ContentEditionController, {
  needs: ['application', 'site'],
  site: Ember.computed.alias('controllers.site.model'),

  editionRelationships: Ember.A([ 'cover' ]),
  editionDefaultTitle: t('page.untitled'),
  editionSaveMsgOk: t('page.saved'),
  editionSaveMsgErr: t('page.saveFailed'),

  contentEditionDidCommit: function(pageSaved) {
    var currentRoute = this.get('controllers.application.currentRouteName');
    if (currentRoute === 'pages.new') {
      this.transitionToRoute('pages.page', pageSaved);
    }
  }
});

export default PagesPageController;

import Ember from 'ember';
import ContentEditionController from 'kowa/mixins/content-edition-controller';
import { translationMacro as t } from "ember-i18n";

var PostsPostController = Ember.Controller.extend(ContentEditionController, {
  needs: ['application', 'site'],
  site: Ember.computed.alias('controllers.site.model'),

  editionRelationships: Ember.A([ 'cover' ]),
  editionDefaultTitle: t('post.untitled'),
  editionSaveMsgOk: t('post.saved'),
  editionSaveMsgErr: t('post.saveFailed'),

  contentEditionDidCommit: function(postSaved) {
    var currentRoute = this.get('controllers.application.currentRouteName');
    if (currentRoute === 'posts.new') {
      this.transitionToRoute('posts.post', postSaved);
    }
  },

  actions: {
    publishPost: function() {
      var model = this.get('model');

      model.set('published', true);
      model.set('publishedAt', new Date());

      this.commitEdition(this.get('i18n').t('post.published'), this.get('i18n').t('post.publishFailed'));
    },

    unpublishPost: function() {
      this.get('model').set('published', false);

      this.commitEdition(this.get('i18n').t('post.unpublished'), this.get('i18n').t('post.unpublishFailed'));
    }
  }
});

export default PostsPostController;

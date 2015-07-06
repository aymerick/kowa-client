import Ember from 'ember';
import ContentEditionController from 'kowa/mixins/content-edition-controller';

var PostsPostController = Ember.Controller.extend(ContentEditionController, {
  needs: ['application', 'site'],
  site: Ember.computed.alias('controllers.site.model'),

  editionRelationships: Ember.A([ 'cover' ]),
  editionDefaultTitle: 'post.untitled', // This is a i18n key

  editionSaveMsgOk: 'post.saved', // This is a i18n key
  editionSaveMsgErr: 'post.saveFailed', // This is a i18n key

  contentEditionDidCommit: function(postSaved) {
    var currentRoute = this.get('controllers.application.currentRouteName');
    if (currentRoute === 'posts.new') {
      this.transitionToRoute('posts.post', postSaved);
    }
  },

  i18n: function() {
    return {
      postBody: this.t('post.body'),
      postTitle: this.t('post.title')
    };
  }.property('langService.currentLang'),

  actions: {
    publishPost: function() {
      this.get('model').set('published', true);

      this.commitEdition(this.t('post.published'), this.t('post.publishFailed'));
    },

    unpublishPost: function() {
      this.get('model').set('published', false);

      this.commitEdition(this.t('post.unpublished'), this.t('post.unpublishFailed'));
    }
  }
});

export default PostsPostController;

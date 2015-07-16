import Ember from 'ember';
import PaginationControllerMixin from 'kowa/mixins/pagination-controller';

function publishedAtCompare(item1, item2) {
  var published1 = item1.get('publishedAt'),
      published2 = item2.get('publishedAt');

  if (!published1 && !published2) {
    return 0;
  }

  if (!published1 && published2) {
    return -1;
  }

  if (!published2 && published1) {
    return 1;
  }

  return Ember.compare(published1.valueOf(), published2.valueOf());
}

var PostsController = Ember.ArrayController.extend(PaginationControllerMixin, {
  sortProperties: ['published', 'publishedAt', 'updatedAt'],


  // override Ember.SortableMixin
  //
  //     published: ASC
  //     publishedAt: DESC
  //     updatedAt: DESC
  orderBy: function (item1, item2) {
    var updated1 = item1.get('updatedAt'),
        updated2 = item2.get('updatedAt');

    if (item1.get('isNew') || !updated1) {
      return -1;
    }

    if (item2.get('isNew') || !updated2) {
      return 1;
    }

    var statusResult = Ember.compare(item1.get('published'), item2.get('published'));

    if (statusResult === 0) {
      var publishedAtResult = publishedAtCompare(item1, item2);

      if (publishedAtResult === 0) {
        var updatedAtResult = Ember.compare(updated1.valueOf(), updated2.valueOf());

        return updatedAtResult * -1;
      }

      return publishedAtResult * -1;
    }

    return statusResult;
  }
});

export default PostsController;

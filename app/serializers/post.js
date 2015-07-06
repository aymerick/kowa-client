import DS from 'ember-data';

var ATTRS = [ 'title', 'body', 'format', 'published', 'publishedAt' ];

var BELONGS_TO = [ 'site', 'cover' ];

var PostSerializer = DS.RESTSerializer.extend({
  serialize: function(snapshot, options) {
    var result = {};

    if (options && options.includeId && snapshot.id) {
      result['id'] = snapshot.id;
    }

    ATTRS.forEach(function(fieldName) {
      result[fieldName] = snapshot.attr(fieldName);
    });

    if (!result['published']) {
      delete(result['publishedAt']);
    }

    BELONGS_TO.forEach(function(fieldName) {
      var fieldId = snapshot.belongsTo(fieldName, { id: true });
      if (fieldId) {
        result[fieldName] = fieldId;
      }
    });

    return result;
  }
});

export default PostSerializer;

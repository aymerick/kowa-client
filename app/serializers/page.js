import DS from 'ember-data';

var ATTRS = [ 'title', 'tagline', 'body', 'format', 'inNavBar' ];

var BELONGS_TO = [ 'site', 'cover' ];

var PageSerializer = DS.RESTSerializer.extend({
  isNewSerializerAPI: true,

  serialize: function(snapshot, options) {
    var result = {};

    if (options && options.includeId && snapshot.id) {
      result['id'] = snapshot.id;
    }

    ATTRS.forEach(function(fieldName) {
      result[fieldName] = snapshot.attr(fieldName);
    });

    BELONGS_TO.forEach(function(fieldName) {
      var fieldId = snapshot.belongsTo(fieldName, { id: true });
      if (fieldId) {
        result[fieldName] = fieldId;
      }
    });

    return result;
  }
});

export default PageSerializer;

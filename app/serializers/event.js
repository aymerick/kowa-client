import DS from 'ember-data';

var ATTRS = [ 'startDate', 'endDate', 'title', 'body', 'format', 'place' ];

var BELONGS_TO = [ 'site', 'cover' ];

var EventSerializer = DS.RESTSerializer.extend({
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

    // startDate
    if (result['startDate'] == null) {
      delete(result['startDate']);
    }

    // endDate
    if (result['endDate'] == null) {
      delete(result['endDate']);
    }

    return result;
  }
});

export default EventSerializer;

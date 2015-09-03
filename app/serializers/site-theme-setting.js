import DS from 'ember-data';

var ATTRS = [ 'sass' ];

var SitePageSettingsSerializer = DS.RESTSerializer.extend({
  serialize: function(snapshot, options) {
    var result = {};

    if (options && options.includeId && snapshot.id) {
      result['id'] = snapshot.id;
    }

    ATTRS.forEach(function(fieldName) {
      result[fieldName] = snapshot.attr(fieldName);
    });

    return result;
  }
});

export default SitePageSettingsSerializer;

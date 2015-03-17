import DS from 'ember-data';

var SITE_SERIALIZER_FIELDS = [
  'name', 'tagline', 'description',
  'moreDesc', 'joinText', 'email', 'address',
  'facebook', 'twitter', 'googlePlus', 'googleAnalytics',
  'logo', 'cover', 'theme', 'baseUrl', 'uglyUrl',
  'nameInNavBar', 'lang'
];

var SiteSerializer = DS.RESTSerializer.extend({
  serialize: function(site, options) {
    var result = site.getProperties(SITE_SERIALIZER_FIELDS);

    if (options && options.includeId) {
      result['id'] = site.get('id');
    }

    // logo
    if (result['logo']) {
      result['logo'] = result['logo'].get('id');
    }

    if (result['logo'] == null) {
      delete(result['logo']);
    }

    // cover
    if (result['cover']) {
      result['cover'] = result['cover'].get('id');
    }

    if (result['cover'] == null) {
      delete(result['cover']);
    }

    return result;
  }
});

export default SiteSerializer;

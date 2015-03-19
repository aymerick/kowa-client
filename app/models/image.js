import DS from 'ember-data';

var ImageModel = DS.Model.extend({
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  name: DS.attr(),
  size: DS.attr('number'),
  type: DS.attr(),

  url: DS.attr(),
  thumbUrl: DS.attr(),
  squareUrl: DS.attr(),
  smallUrl: DS.attr(),
  smallFillUrl: DS.attr(),
  portraitFillUrl: DS.attr(),
  largeUrl: DS.attr(),

  site: DS.belongsTo('site', { inverse: 'images', async: true }),

  logoSites: DS.hasMany('site', { inverse: 'logo', async: true }),
  coverSites: DS.hasMany('site', { inverse: 'cover', async: true }),
  faviconSites: DS.hasMany('site', { inverse: 'favicon', async: true }),

  coverPosts: DS.hasMany('post', { inverse: 'cover', async: true }),
  coverEvents: DS.hasMany('event', { inverse: 'cover', async: true }),
  coverPages: DS.hasMany('page', { inverse: 'cover', async: true }),
  coverActivities: DS.hasMany('activity', { inverse: 'cover', async: true }),
  photoMembers: DS.hasMany('member', { inverse: 'photo', async: true }),
  sitePageSettings: DS.hasMany('site-page-setting', { inverse: 'cover', async: true })
});

export default ImageModel;

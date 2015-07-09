import DS from 'ember-data';
import Ember from 'ember';

var Site = DS.Model.extend({
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  changedAt: DS.attr('date'),
  builtAt: DS.attr('date'),
  lang: DS.attr(),
  tz: DS.attr(),

  name: DS.attr(),
  tagline: DS.attr(),
  description: DS.attr(),
  moreDesc: DS.attr(),
  joinText: DS.attr(),

  email: DS.attr(),
  address: DS.attr(),

  facebook: DS.attr(),
  twitter: DS.attr(),
  googlePlus: DS.attr(),

  googleAnalytics: DS.attr(),

  logo: DS.belongsTo('image', { inverse: 'logoSites', async: true }),
  cover: DS.belongsTo('image', { inverse: 'coverSites', async: true }),
  favicon: DS.belongsTo('image', { inverse: 'faviconSites', async: true }),

  membership: DS.belongsTo('file', { inverse: 'membershipSites', async: true }),

  user: DS.belongsTo('user', { async: true }),

  posts: DS.hasMany('post', { async: true }),
  events: DS.hasMany('event', { async: true }),
  pages: DS.hasMany('page', { async: true }),
  activities: DS.hasMany('activity', { async: true }),
  images: DS.hasMany('image', { inverse: 'site', async: true }),
  files: DS.hasMany('file', { inverse: 'site', async: true }),

  pageSettings: DS.hasMany('site-page-setting'),

  // settings
  theme: DS.attr(),
  domain: DS.attr(),
  customUrl: DS.attr(),
  uglyUrl: DS.attr('boolean'),

  // theme settings
  nameInNavBar: DS.attr('boolean'),

  baseUrl: function() {
    var url = this.get('customUrl');
    if (!Ember.isBlank(url)) {
      return url;
    }

    return 'http://' + this.get('id') + '.' + this.get('domain');
  }.property('domain', 'customUrl', 'id'),
});

export default Site;

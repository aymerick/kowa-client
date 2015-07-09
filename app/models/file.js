import DS from 'ember-data';

var FileModel = DS.Model.extend({
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  kind: DS.attr(),
  name: DS.attr(),
  size: DS.attr('number'),
  type: DS.attr(),

  url: DS.attr(),

  site: DS.belongsTo('site', { inverse: 'files', async: true }),

  membershipSites: DS.hasMany('site', { inverse: 'membership', async: true })
});

export default FileModel;

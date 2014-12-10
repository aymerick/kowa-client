import DS from 'ember-data';

var ImageModel = DS.Model.extend({
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  url: DS.attr(),
  thumbUrl: DS.attr(),

  site: DS.belongsTo('site', { async: true })
});

export default ImageModel;

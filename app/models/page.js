import DS from 'ember-data';

var Page = DS.Model.extend({
  createdAt: DS.attr('date', { defaultValue: function() { return new Date(); } }),
  updatedAt: DS.attr('date', { defaultValue: function() { return new Date(); } }),

  title: DS.attr('string', { defaultValue: "" }),
  tagline: DS.attr('string', { defaultValue: "" }),
  body: DS.attr('string', { defaultValue: "" }),

  inNavBar: DS.attr('boolean', { defaultValue: false }),

  cover: DS.belongsTo('image', { inverse: 'coverPages', async: true }),

  site: DS.belongsTo('site', { async: true })
});

export default Page;

import DS from 'ember-data';

export default DS.Model.extend({
  palette: DS.attr('string', { defaultValue: "" }),
  sass: DS.attr('string', { defaultValue: "" }),

  // this fake attribute does not exist on the server but is needed
  // to build custom URLs when creating/updating a record
  site: DS.belongsTo('site')
});

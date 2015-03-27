import DS from 'ember-data';

var SitePageSettingAdapter = DS.RESTAdapter.extend({
  pathForType: function() {
    return 'page-settings';
  },

  buildURL: function(type, id, snapshot) {
    // I know, side-effect programming is bad... I feel bad for that
    this.set('namespace', "api/sites/" + snapshot.belongsTo('site', { id: true }));

    return this._super(type, id, snapshot);
  }
});

export default SitePageSettingAdapter;

import DS from 'ember-data';

var SiteThemeSettingAdapter = DS.RESTAdapter.extend({
  pathForType: function() {
    return 'theme-settings';
  },

  buildURL: function(type, id, snapshot) {
    // I know, side-effect programming is wrong... I feel bad for that
    this.set('namespace', "api/sites/" + snapshot.belongsTo('site', { id: true }));

    return this._super(type, id, snapshot);
  }
});

export default SiteThemeSettingAdapter;

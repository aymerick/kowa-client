import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Service.extend({
  conf: Ember.computed(function () {
    var self = this;

    var confPromise = ajax('/api/configuration').then(function(response) {
      return response;
    });

    return Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
      promise: confPromise
    });
  })
});

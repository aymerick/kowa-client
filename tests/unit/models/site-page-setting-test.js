import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('site-page-setting', 'SitePageSetting', {
  // Specify the other units that are required for this test.
  needs: [ 'model:image', 'model:user', 'model:post', 'model:page', 'model:activity', 'model:site', 'model:event', 'model:member' ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

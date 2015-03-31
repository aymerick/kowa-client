import UnauthenticatedRoute from 'kowa/routes/unauthenticated';
import StyleBodyMixin from 'kowa/mixins/style-body';

var SignupRoute = UnauthenticatedRoute.extend(StyleBodyMixin, {
  classNames: ['kowa-signup']
});

export default SignupRoute;

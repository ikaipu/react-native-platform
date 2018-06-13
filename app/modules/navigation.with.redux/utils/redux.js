import {
  createNavigationPropConstructor,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {rootConfigKey} from '../../redux/redux';

const reactNativeNavigationReduxMiddleware = createReactNavigationReduxMiddleware(
  rootConfigKey,
  state => state.navigation,
);
const navigationPropConstructor = createNavigationPropConstructor(rootConfigKey);

export {reactNativeNavigationReduxMiddleware, navigationPropConstructor};

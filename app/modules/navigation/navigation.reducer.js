// refer https://reactnavigation.org/docs/redux-integration.html
import {AppNavigator} from './app.navigator';

const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

export default function navigation(state = initialNavState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
}

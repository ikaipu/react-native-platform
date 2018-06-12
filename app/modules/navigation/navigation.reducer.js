// refer https://reactnavigation.org/docs/redux-integration.html
import {StackNavigator} from './navigation';

const initialNavState = StackNavigator.router.getStateForAction(StackNavigator.router.getActionForPathAndParams('Home'));

export default function navigation(state = initialNavState, action) {
  const nextState = StackNavigator.router.getStateForAction(action, state);


  return nextState || state;
}

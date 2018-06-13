import system from './system/system.reducer';
import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';

export default {
  system,
  navigation: NavigationReducer.reducer,
};

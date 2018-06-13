import errorMessages from '../error.messages';

class NavigationReducer {
  init = (Navigator, rootScreen) => {
    this.Navigator = Navigator;
    this.initialNavState = this.Navigator.router.getStateForAction(
      Navigator.router.getActionForPathAndParams(rootScreen),
    );
  };

  reducer = (state = this.initialNavState, action) => {
    if (!state) {
      return Promise.reject(new Error(errorMessages.uninitializedClass));
    }
    const nextState = this.Navigator.router.getStateForAction(action, state);

    return nextState || state;
  };
}

export default new NavigationReducer();

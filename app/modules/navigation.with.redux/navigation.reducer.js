import errorMessages from '../error.messages';

type NavigatorType = {
  router: {
    getStateForAction: Function,
    getActionForPathAndParams: Function,
  },
};

class NavigationReducer {
  Navigator: NavigatorType;

  initialNavState: {};

  init = (Navigator: NavigatorType, rootScreen: string) => {
    this.Navigator = Navigator;
    this.initialNavState = this.Navigator.router.getStateForAction(
      Navigator.router.getActionForPathAndParams(rootScreen),
    );
  };

  reducer = (state: {} = this.initialNavState, action: {}) => {
    if (!state) {
      throw new Error(errorMessages.uninitializedClass);
    }
    const nextState = this.Navigator.router.getStateForAction(action, state);

    return nextState || state;
  };
}

export default new NavigationReducer();

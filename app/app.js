// refer https://reactnavigation.org/docs/redux-integration.html
import React, {Component} from 'react';
import {AppState, BackHandler, NetInfo} from 'react-native';
import AppWithNavigationState from './modules/navigation.with.redux/app.navigator';
import ReduxProvider from './modules/redux/redux';
import combineReducers from './reducers/combine.reducers';
import NavigationReducer from './modules/navigation.with.redux/navigation.reducer';
import StackNavigator from './navigators/stack.navigator';
import {reactNativeNavigationReduxMiddleware} from './modules/navigation.with.redux/utils/redux';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };

    this.RootNavigator = StackNavigator;
    NavigationReducer.init(this.RootNavigator, 'Home');

    AppState.addEventListener('change', this.handleAppStateChange);
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    window.onunhandledrejection = (promise, reason) => { // eslint-disable-line
      console.error('Unhandled rejection is', promise, reason);
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => true;

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // it is called when the app become active
    } else if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
      // it is called when the app become inactive or background
    }
    this.setState({appState: nextAppState});
  };

  handleConnectivityChange = (connectInfo) => {
    if (connectInfo === 'none') {
      // it is called when the app connection become offline
    } else {
      // it is called if the app connection become offline

    }
  };

  render() {
    return (
      <ReduxProvider
        combineReducers={combineReducers}
        immutableTransforms={[]}
        persistedList={[]}
        middlewares={[reactNativeNavigationReduxMiddleware]}>
        <AppWithNavigationState Navigator={this.RootNavigator} />
      </ReduxProvider>);
  }
}


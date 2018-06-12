// refer https://reactnavigation.org/docs/redux-integration.html
import React, {Component} from 'react';
import {AppState, BackAndroid, NetInfo} from 'react-native';
import Home from './containers/home';
import ReduxProvider from './modules/redux/redux';
import combineReducers from './reducers/combine.reducers';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
    AppState.addEventListener('change', this.handleAppStateChange);
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    window.onunhandledrejection = (promise, reason) => { // eslint-disable-line
      console.error('Unhandled rejection is', promise, reason);
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
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
        persistedList={[]}>
        <Home />
      </ReduxProvider>);
  }
}


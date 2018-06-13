// @flow

import type { Element } from 'react';
import React from 'react';

import { AppState, BackHandler, NetInfo } from 'react-native';

type Props = {
  children: Element<Object>,
};

type State = {
  appState: Object,
};
class Listeners extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };

    AppState.addEventListener('change', this.handleAppStateChange);
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    window.onunhandledrejection = (promise, reason) => { // eslint-disable-line
      console.error('Unhandled rejection is', promise, reason);
    };
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleBackButton = () => true;

  handleAppStateChange = (nextAppState: { match: Function }) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // it is called when the app become active
    } else if (
      this.state.appState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      // it is called when the app become inactive or background
    }
    this.setState({ appState: nextAppState });
  };

  handleConnectivityChange = (connectInfo: string) => {
    if (connectInfo === 'none') {
      // it is called when the app connection become offline
      console.log('offline');
    } else {
      // it is called if the app connection become offline
      console.log('online');
    }
  };

  render() {
    return this.props.children;
  }
}

export default Listeners;

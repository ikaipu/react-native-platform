// refer https://reactnavigation.org/docs/redux-integration.html
import React from 'react';
import {addNavigationHelpers, createStackNavigator} from 'react-navigation';
import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import Home from '../../containers/home';

const reduxBoundAddListener = createReduxBoundAddListener('root');

export const StackNavigator = createStackNavigator({
  Home: {screen: Home},
});

type Props = {
  dispatch: () => {},
  navigation: {},
}
const RootNavigator = (props: Props) => (
  <StackNavigator navigation={addNavigationHelpers({
    dispatch: props.dispatch,
    state: props.navigation,
    addListener: reduxBoundAddListener,
  })} />
);

const mapStateToProps = store => (
  {
    navigation: store.navigation,
  }
);

export default connect(mapStateToProps)(RootNavigator);


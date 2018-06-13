import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {initializeListeners} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import Home from '../../containers/home';

import {navigationPropConstructor} from './utils/redux';

export const AppNavigator = createStackNavigator({
  Home: {screen: Home},
});

type Props = {
  navigation: {},
  dispatch: () => {},
}
class AppWithNavigationState extends React.Component<Props> {
  componentDidMount() {
    initializeListeners('root', this.props.navigation);
  }

  render() {
    const {dispatch, navigation} = this.props;

    this.nav = navigationPropConstructor(
      dispatch,
      navigation,
      AppNavigator.router,
      () => this.nav,
    );

    return <AppNavigator navigation={this.nav} />;
  }
}

const mapStateToProps = state => (
  {
    navigation: state.navigation,
  });

export default connect(mapStateToProps)(AppWithNavigationState);

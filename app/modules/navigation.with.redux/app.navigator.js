import React from 'react';
import {initializeListeners} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import errorMessages from '../error.messages';
import {rootConfigKey} from '../redux.with.immutable/redux';
import {navigationPropConstructor} from './utils/redux';

type Props = {
  navigation: {},
  dispatch: () => {},
  Navigator: Object,
}
class AppWithNavigationState extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.Navigator = props.Navigator;
  }

  componentDidMount() {
    initializeListeners(rootConfigKey, this.props.navigation);
  }

  Navigator;

  nav;

  render() {
    const {Navigator} = this;

    if (!this.Navigator) {
      console.error(new Error(errorMessages.uninitializedClass));
    }
    const {dispatch, navigation} = this.props;

    this.nav = navigationPropConstructor(
      dispatch,
      navigation,
      Navigator.router,
      () => this.nav,
    );

    return <Navigator navigation={this.nav} />;
  }
}

const mapStateToProps = state => (
  {
    navigation: state.navigation,
  });

export default connect(mapStateToProps)(AppWithNavigationState);

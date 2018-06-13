import React, {Component} from 'react';
import Listeners from './listeners/listeners';
import AppWithNavigationState from './modules/navigation.with.redux/app.navigator';
import NavigationReducer from './modules/navigation.with.redux/navigation.reducer';
import {reactNativeNavigationReduxMiddleware} from './modules/navigation.with.redux/utils/redux';
import ReduxProvider from './modules/redux.with.immutable/redux';
import StackNavigator from './navigators/stack.navigator';
import combineReducers, {immutableRecords, persistedList} from './reducers/combine.reducers';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.RootNavigator = StackNavigator;
    NavigationReducer.init(this.RootNavigator, 'Home');
  }

  render() {
    return (
      <Listeners>
        <ReduxProvider
          combineReducers={combineReducers}
          immutableRecords={immutableRecords}
          persistedList={persistedList}
          middlewares={[reactNativeNavigationReduxMiddleware]}>
          <AppWithNavigationState Navigator={this.RootNavigator} />
        </ReduxProvider>
      </Listeners>
    );
  }
}


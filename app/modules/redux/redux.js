// refer https://reactnavigation.org/docs/redux-integration.html
import React, {Component, Element} from 'react';
import {AsyncStorage} from 'react-native';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {persistCombineReducers, persistStore} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import {PersistGate} from 'redux-persist/es/integration/react';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import autoMergeLevel2Immutable from './utils/automergeLevel2-immutable';
import combineReducers from '../../reducers/combine.reducers';

export const debugWrapper = composeWithDevTools({realtime: true, port: 8000});

export const logger = () => function log(next) {
  return (action) => {
    console.log(`--- ${action.type} ---`);
    console.log('action: %O', action);
    console.log('before: %O', store.getState());
    next(action); // eslint-disable-line
    console.log('after: %O', store.getState());
  };
};

export const reducer = persistCombineReducers({
  key: 'root',
  stateReconciler: autoMergeLevel2Immutable,
  transforms: [
    immutableTransform(),
  ],
  storage: AsyncStorage,
  whitelist: [],
  debug: true,
}, combineReducers);

// createReactNavigationReduxMiddleware must be run
// before createReduxBoundAddListener on navigation.js
const store = createStore(
  reducer,
  debugWrapper(applyMiddleware(...[
    thunk,
    logger,
    createReactNavigationReduxMiddleware(
      'root',
      state => state.nav,
    ),
  ])),
);

export const persistor = persistStore(
  store,
  null,
);

type Props = {
  children: Element
};

export default class ReduxProvider extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    );
  }
}


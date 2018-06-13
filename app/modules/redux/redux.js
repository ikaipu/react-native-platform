// refer https://reactnavigation.org/docs/redux-integration.html
import React, {Component, Element} from 'react';
import {AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {persistCombineReducers, persistStore} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import {PersistGate} from 'redux-persist/es/integration/react';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import autoMergeLevel2Immutable from './utils/automergeLevel2-immutable';

export const rootConfigKey = 'root';

const debugWrapper = composeWithDevTools({realtime: true, port: 8000});

type Props = {
  children: Element,
  combineReducers: Object,
  immutableTransforms: Array,
  persistedList: Array,
  middlewares: Array,
};

export default class ReduxProvider extends Component<Props> {
  constructor(props) {
    super(props);

    const {combineReducers, immutableTransforms} = props;

    this.persistConfig = {
      key: rootConfigKey,
      stateReconciler: autoMergeLevel2Immutable,
      transforms: [
        immutableTransform(immutableTransforms),
      ],
      storage: AsyncStorage,
      whitelist: props.persistedList,
      debug: true,
    };

    this.reducer = persistCombineReducers(this.persistConfig, combineReducers);
    this.logger = () => function log(next) {
      return (action) => {
        console.log(`--- ${action.type} ---`);
        console.log('action: %O', action);
        console.log('before: %O', this.state && this.store.getState());
        next(action); // eslint-disable-line
        console.log('after: %O', this.state && this.store.getState());
      };
    };


    this.middleware = debugWrapper(applyMiddleware(...[
      thunk,
      this.logger,
      ...this.props.middlewares,
    ]));

    this.store = createStore(this.reducer, this.middleware);

    this.persistor = persistStore(this.store, null);
  }

  render() {
    return (
      <Provider store={this.store}>
        <PersistGate persistor={this.persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    );
  }
}

ReduxProvider.defaultProps = {
  middlewares: [],
};


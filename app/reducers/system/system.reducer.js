import System from './system.record';
import {SET_TIMESTAMP_OFFSET} from './system.action';


class SystemReducer {
  reducer = (state = new System(), action) => {
    switch (action.type) {
      case SET_TIMESTAMP_OFFSET: {
        return state.set('timestampOffset', action.timestampOffset);
      }
      default: {
        return state;
      }
    }
  }
}

export default new SystemReducer();

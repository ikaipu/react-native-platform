import System from './system.record';
import { SET_TIMESTAMP_OFFSET } from './system.action';

class SystemReducer {
  reducer = (state: typeof System = new System(), action: Object) => {
    switch (action.type) {
      case SET_TIMESTAMP_OFFSET: {
        return state.set('timestampOffset', action.timestampOffset);
      }
      default: {
        return state;
      }
    }
  };
}

export default new SystemReducer();

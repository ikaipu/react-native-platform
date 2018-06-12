import System from './system.record';
import {SET_TIMESTAMP_OFFSET} from './system.action';

export default function system(state = new System(), action) {
  switch (action.type) {
    case SET_TIMESTAMP_OFFSET: {
      return state.set('timestampOffset', action.timestampOffset);
    }
    default: {
      return state;
    }
  }
}

export const SET_TIMESTAMP_OFFSET = 'SET_TIMESTAMP_OFFSET';

export const setTimestampOffset = timestampOffset =>
  dispatch =>
    dispatch({
      type: SET_TIMESTAMP_OFFSET,
      timestampOffset,
    });

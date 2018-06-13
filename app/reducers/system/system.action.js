export const SET_TIMESTAMP_OFFSET = 'SET_TIMESTAMP_OFFSET';

class SystemAction {
  setTimestampOffset = timestampOffset =>
    dispatch =>
      dispatch({
        type: SET_TIMESTAMP_OFFSET,
        timestampOffset,
      });
}
export default new SystemAction();

export const SET_TIMESTAMP_OFFSET = 'SET_TIMESTAMP_OFFSET';

class SystemAction {
  setTimestampOffset = (timestampOffset: number) =>
    (dispatch: Function) =>
      dispatch({
        type: SET_TIMESTAMP_OFFSET,
        timestampOffset,
      });
}
export default new SystemAction();

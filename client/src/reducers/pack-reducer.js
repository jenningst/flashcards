// action types
const types = {
  SET_REVIEW_MODE: 'SET_REVIEW_MODE',
  SET_WRITE_MODE: 'SET_WRITE_MODE',
  RESET_MODE: 'RESET_MODE',
};

// state
const INITIAL_STATE = {
  mode: '',
};

// pack mode reducer
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_REVIEW_MODE:
      return { ...state, mode: 'REVIEW_MODE' };
    case types.SET_WRITE_MODE:
      return { ...state, mode: 'WRITE_MODE' };
    case types.RESET_MODE:
      return { ...state, mode: ''}
    default:
      return state;
  };
};

export { INITIAL_STATE, types, reducer };
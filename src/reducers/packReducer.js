export const initialState = {
  packFilter: 'SHOW_ALL',
  createPack: false,
  packMode: '',
};

export default function packReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_COLLECTION':
      return { ...state, packFilter: action.name };
    case 'TOGGLE_CREATE_PACK':
      return { ...state, createPack: !state.createPack };
    case 'CLEAR_COLLECTION':
      return { ...state, packFilter: 'SHOW_ALL' };
    case 'SET_REVIEW_MODE':
      return { ...state, packMode: 'REVIEW_MODE' };
    case 'SET_WRITE_MODE':
      return { ...state, packMode: 'WRITE_MODE' };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  };
};

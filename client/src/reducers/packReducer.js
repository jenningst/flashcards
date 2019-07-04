export const initialState = {
  packFilter: 'SHOW_ALL',
  packName: '',
  packMode: '',
};

export default function packReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PACK_FILTER':
      return { ...state, packFilter: action.id, packName: action.name };
    case 'TOGGLE_CREATE_PACK':
      return { ...state, displayCreatePack: !state.displayCreatePack };
    case 'CLEAR_COLLECTION':
      return { ...state, packFilter: 'SHOW_ALL' };
    case 'SET_REVIEW_MODE':
      return { ...state, packMode: 'REVIEW_MODE' };
    case 'SET_WRITE_MODE':
      return { ...state, packMode: 'WRITE_MODE' };
    case 'CLEAR_MODE':
      return { ...state, packMode: ''}
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  };
};

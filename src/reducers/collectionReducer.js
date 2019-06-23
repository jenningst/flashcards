export const initialState = {
  collection: ''
};

export default function collectionReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_COLLECTION':
      return { state, collection: action.name };
    case 'CLEAR_COLLECTION':
      return initialState;
    default:
      return state;
  };
};

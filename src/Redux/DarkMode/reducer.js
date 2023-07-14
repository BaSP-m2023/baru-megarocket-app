import { SET_DARK_MODE } from './constants';

const INITIAL_STATE = {
  dark: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DARK_MODE: {
      return {
        ...state,
        dark: action.payload.state
      };
    }
    default:
      return state;
  }
};

export default reducer;

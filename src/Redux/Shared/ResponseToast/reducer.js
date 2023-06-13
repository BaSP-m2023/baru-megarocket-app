import { SET_CONTENT_TOAST, SET_DISPLAY_TOAST, RESET_TOAST } from './constants';

const INITIAL_STATE = {
  show: false,
  message: '',
  state: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DISPLAY_TOAST: {
      return {
        ...state,
        show: action.payload.state
      };
    }
    case SET_CONTENT_TOAST: {
      return {
        ...state,
        message: action.payload.message,
        state: action.payload.state
      };
    }
    case RESET_TOAST: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};

export default reducer;

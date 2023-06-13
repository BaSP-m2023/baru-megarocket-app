import { SET_CONTENT_TOAST, SET_DISPLAY_TOAST, RESET_TOAST } from './constants';

export const handleDisplayToast = (state) => {
  return {
    type: SET_DISPLAY_TOAST,
    payload: {
      state
    }
  };
};

export const setContentToast = ({ message, state }) => {
  return {
    type: SET_CONTENT_TOAST,
    payload: {
      message,
      state
    }
  };
};

export const resetToast = () => {
  return {
    type: RESET_TOAST
  };
};

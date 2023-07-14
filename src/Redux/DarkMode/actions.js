import { SET_DARK_MODE } from './constants';

export const setDarkMode = (state) => {
  return {
    type: SET_DARK_MODE,
    payload: {
      state
    }
  };
};

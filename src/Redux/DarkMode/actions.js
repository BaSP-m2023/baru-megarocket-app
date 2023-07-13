import { SET_DARK_MODE } from './constants';

export const setDarkMode = (state) => {
  console.log(state);
  return {
    type: SET_DARK_MODE,
    payload: {
      state
    }
  };
};

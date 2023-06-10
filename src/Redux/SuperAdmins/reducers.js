import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR
} from './constants';

const initialState = {
  superadmins: [],
  loading: false,
  error: null
};

export const superadminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        superadmins: action.payload,
        loading: false
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

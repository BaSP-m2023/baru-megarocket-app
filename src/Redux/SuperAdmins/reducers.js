import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  ADD_SUPERADMIN_ERROR,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_ERROR
} from './constants';

const initialState = {
  superadmins: [],
  loading: false,
  error: null
};

const addSuperadminState = {
  newSuperadmin: {},
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

export const addSuperadminReducer = (state = addSuperadminState, action) => {
  switch (action.type) {
    case ADD_SUPERADMIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_SUPERADMIN_SUCCESS:
      return {
        ...state,
        newSuperadmin: action.payload,
        loading: false
      };
    case ADD_SUPERADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export const editSuperadminReducer = (state = addSuperadminState, action) => {
  switch (action.type) {
    case EDIT_SUPERADMIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case EDIT_SUPERADMIN_SUCCESS:
      return {
        ...state,
        newSuperadmin: action.payload,
        loading: false
      };
    case EDIT_SUPERADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

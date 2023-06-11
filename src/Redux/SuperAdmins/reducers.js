import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  ADD_SUPERADMIN_ERROR,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR
} from './constants';

const initialState = {
  superadmins: [],
  loading: false,
  error: null
};

// const addSuperadminState = {
//   loading: false,
//   error: null
// };

// const editSuperadminState = {
//   loading: false,
//   error: null
// };

// const deleteSuperadminState = {
//   loading: false,
//   error: null
// };

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

export const addSuperadminReducer = (state = initialState, action) => {
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

export const editSuperadminReducer = (state = initialState, action) => {
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

export const deleteSuperadminReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SUPERADMIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_SUPERADMIN_SUCCESS:
      return {
        ...state,
        superadmins: state.superadmins.filter((superadmin) => superadmin._id !== action.payload)
      };
    case DELETE_SUPERADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

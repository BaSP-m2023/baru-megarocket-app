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
  DELETE_SUPERADMIN_ERROR,
  CLOSE_MESSAGE
} from './constants';

const initialState = {
  superadmins: [],
  loading: false,
  error: null,
  resState: '',
  resMessage: '',
  showMessage: false
};

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
        superadmins: action.payload.superadmins,
        loading: false,
        error: null
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        resState: action.payload.resState,
        resMessage: action.payload.resMessage,
        showMessage: true
      };
    case ADD_SUPERADMIN_PENDING:
      return {
        ...state
      };
    case ADD_SUPERADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        resState: action.payload.resState,
        resMessage: action.payload.resMessage,
        showMessage: true
      };
    case ADD_SUPERADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        resState: action.payload.resState,
        resMessage: action.payload.resMessage,
        showMessage: true
      };
    case EDIT_SUPERADMIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case EDIT_SUPERADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        resState: action.payload.resState,
        resMessage: action.payload.resMessage,
        showMessage: true
      };
    case EDIT_SUPERADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        resState: action.payload.resState,
        resMessage: action.payload.resMessage,
        showMessage: true
      };
    case DELETE_SUPERADMIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_SUPERADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        superadmins: state.superadmins.filter((superadmin) => superadmin._id !== action.payload),
        resState: action.payload.resState,
        resMessage: action.payload.resMessage,
        showMessage: true
      };
    case DELETE_SUPERADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        resState: action.payload.resState,
        resMessage: action.payload.resMessage,
        showMessage: true
      };
    case CLOSE_MESSAGE:
      return {
        ...state,
        loading: false,
        error: null,
        resState: '',
        resMessage: '',
        showMessage: false
      };
    default:
      return state;
  }
};

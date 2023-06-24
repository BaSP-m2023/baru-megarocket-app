import {
  LOGIN_MEMBER_PENDING,
  LOGIN_MEMBER_SUCCESS,
  LOGIN_MEMBER_ERROR,
  LOGOUT_MEMBER
} from './constants';
const INITIAL_STATE = {
  data: null,
  isPending: false,
  error: false,
  isLogged: false
};
const loginMembersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_MEMBER_PENDING:
      return {
        ...state,
        isPending: true
      };
    case LOGIN_MEMBER_SUCCESS:
      return {
        ...state,
        isPending: false,
        isLogged: true,
        data: action.payload
      };
    case LOGIN_MEMBER_ERROR:
      return {
        ...state,
        isPending: false,
        error: true
      };
    case LOGOUT_MEMBER:
      return {
        ...state,
        data: null,
        isLogged: false
      };
    default:
      return state;
  }
};

export default loginMembersReducer;

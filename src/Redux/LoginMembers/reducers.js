import { LOGIN_MEMBER_PENDING, LOGIN_MEMBER_SUCCESS, LOGIN_MEMBER_ERROR } from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: false
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
        data: action.payload
      };
    case LOGIN_MEMBER_ERROR:
      return {
        ...state,
        isPending: false,
        error: true
      };
    default:
      return state;
  }
};

export default loginMembersReducer;

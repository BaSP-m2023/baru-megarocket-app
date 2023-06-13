import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  ADD_ACTIVITIES_PENDING,
  ADD_ACTIVITIES_SUCCESS,
  ADD_ACTIVITIES_ERROR,
  EDIT_ACTIVITIES_PENDING,
  EDIT_ACTIVITIES_SUCCESS,
  EDIT_ACTIVITIES_ERROR,
  RESPONSE_ACTIVITIES_MESSAGE,
  RESET_PRIMARY_STATES,
  DELETE_ACTIVITIES_PENDING,
  DELETE_ACTIVITIES_SUCCESS,
  DELETE_ACTIVITIES_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: false,
  success: false,
  response: {
    message: '',
    state: ''
  }
};

const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_PENDING: {
      return { ...state, isPending: true };
    }

    case GET_ACTIVITIES_SUCCESS: {
      return { ...state, list: action.payload.list, isPending: false };
    }

    case GET_ACTIVITIES_ERROR: {
      return {
        ...state,
        isPending: false,
        error: true,
        response: { message: action.payload.error, state: 'fail' }
      };
    }

    case ADD_ACTIVITIES_PENDING: {
      return { ...state, isPending: true };
    }

    case ADD_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload.newActivity],
        isPending: false,
        success: true
      };
    }

    case ADD_ACTIVITIES_ERROR: {
      return {
        ...state,
        isPending: false,
        error: true,
        response: { message: action.payload.error, state: 'fail' }
      };
    }

    case EDIT_ACTIVITIES_PENDING: {
      return { ...state, isPending: true };
    }

    case EDIT_ACTIVITIES_SUCCESS: {
      const updated = state.list.find(
        (activity) => activity._id === action.payload.activityUpdated._id
      );

      const index = state.list.indexOf(updated);

      state.list[index] = action.payload.activityUpdated;

      return {
        ...state,
        list: state.list,
        isPending: false,
        success: true
      };
    }

    case EDIT_ACTIVITIES_ERROR: {
      return {
        ...state,
        isPending: false,
        error: true,
        response: { message: action.payload.error, state: 'fail' }
      };
    }

    case DELETE_ACTIVITIES_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }

    case DELETE_ACTIVITIES_SUCCESS: {
      const newList = state.list.filter((activity) => activity._id !== action.payload.idDeleted);
      return {
        ...state,
        list: newList,
        isPending: false
      };
    }

    case DELETE_ACTIVITIES_ERROR: {
      return {
        ...state,
        isPending: false,
        error: true,
        response: { message: action.payload.error, state: 'fail' }
      };
    }

    case RESPONSE_ACTIVITIES_MESSAGE: {
      return { ...state, response: action.payload.response };
    }

    case RESET_PRIMARY_STATES: {
      return {
        ...state,
        error: false,
        success: false,
        response: { message: '', state: '' }
      };
    }
    default:
      return state;
  }
};

export default activitiesReducer;

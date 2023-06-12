import * as actionType from './constants';

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
    case actionType.GET_ACTIVITIES_PENDING: {
      return { ...state, isPending: true };
    }

    case actionType.GET_ACTIVITIES_SUCCESS: {
      return { ...state, list: action.payload.list, isPending: false };
    }

    case actionType.GET_ACTIVITIES_ERROR: {
      return {
        ...state,
        isPending: false,
        error: true,
        response: { message: action.payload.error, state: 'fail' }
      };
    }

    case actionType.ADD_ACTIVITIES_PENDING: {
      return { ...state, isPending: true };
    }

    case actionType.ADD_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload.newActivity],
        isPending: false,
        success: true
      };
    }

    case actionType.ADD_ACTIVITIES_ERROR: {
      return {
        ...state,
        isPending: false,
        error: true,
        response: { message: action.payload.error, state: 'fail' }
      };
    }

    case actionType.EDIT_ACTIVITIES_PENDING: {
      return { ...state, isPending: true };
    }

    case actionType.EDIT_ACTIVITIES_SUCCESS: {
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

    case actionType.EDIT_ACTIVITIES_ERROR: {
      return {
        ...state,
        isPending: false,
        error: true,
        response: { message: action.payload.error, state: 'fail' }
      };
    }

    case actionType.RESPONSE_ACTIVITIES_MESSAGE: {
      return { ...state, response: action.payload.response };
    }

    case actionType.RESET_PRIMARY_STATES: {
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

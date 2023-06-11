import * as actionType from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: ''
};

const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.GET_ACTIVITIES_PENDING: {
      return { ...state, isPending: !state.isPending };
    }
    case actionType.GET_ACTIVITIES_SUCCESS: {
      return { ...state, list: action.payload.list };
    }
    case actionType.GET_ACTIVITIES_ERROR: {
      return { ...state, error: action.payload.error };
    }
    default:
      return state;
  }
};

export default activitiesReducer;

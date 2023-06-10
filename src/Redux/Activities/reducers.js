import * as actionCreator from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  status: ''
};

const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionCreator.GET_ACTIVITIES_PENDING: {
      return { ...state, isPending: !state.isPending };
    }
    case actionCreator.GET_ACTIVITIES_SUCCESS: {
      return { ...state, list: action.payload.list };
    }
    case actionCreator.GET_ACTIVITIES_ERROR: {
      return { ...state, status: action.payload.error };
    }
    default:
      return state;
  }
};

export default activitiesReducer;

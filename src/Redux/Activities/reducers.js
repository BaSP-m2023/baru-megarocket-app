import * as actionCreator from './constants';

const activitiesReducer = (state, action) => {
  switch (action.type) {
    case actionCreator.GET_ACTIVITIES_PENDING: {
      return state;
    }
    case actionCreator.GET_ACTIVITIES_SUCCESS: {
      return state;
    }
    case actionCreator.GET_ACTIVITIES_ERROR: {
      return state;
    }
    default:
      return state;
  }
};

export default activitiesReducer;

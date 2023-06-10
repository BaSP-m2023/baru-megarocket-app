import { combineReducers } from 'redux';

// Import reducers below
import activitiesReducer from './Activities/reducers';

const rootReducers = combineReducers({
  activities: activitiesReducer
});

export default rootReducers;

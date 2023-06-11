import { combineReducers } from 'redux';

// Import reducers below
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import activititesReducer from './Activities/reducers';

const rootReducers = combineReducers({
  classes: classReducer,
  trainers: trainersReducer,
  activities: activititesReducer
});

export default rootReducers;

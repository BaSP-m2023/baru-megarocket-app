import { combineReducers } from 'redux';

// Import reducers below
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';

const rootReducers = combineReducers({
  classes: classReducer,
  trainers: trainersReducer
});

export default rootReducers;

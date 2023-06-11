import { combineReducers } from 'redux';

// Import reducers below
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import membersReducer from './Members/reducers';

const rootReducers = combineReducers({
  classes: classReducer,
  trainers: trainersReducer,
  members: membersReducer
});

export default rootReducers;

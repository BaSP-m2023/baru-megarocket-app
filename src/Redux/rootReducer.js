import { combineReducers } from 'redux';

// Import reducers below
import trainersReducer from './Trainers/reducers';

const rootReducers = combineReducers({
  trainers: trainersReducer
});

export default rootReducers;

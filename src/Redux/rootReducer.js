import { combineReducers } from 'redux';

// Import reducers below
import membersReducer from './Members/reducers';

const rootReducers = combineReducers({
  members: membersReducer
});

export default rootReducers;

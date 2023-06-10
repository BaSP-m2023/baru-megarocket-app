import { combineReducers } from 'redux';

// Import reducers below
import classReducer from './Classes/reducers';

const rootReducers = combineReducers({
  classes: classReducer
});

export default rootReducers;

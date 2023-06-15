import { combineReducers } from 'redux';

// Import reducers below
import toastReducer from './Shared/ResponseToast/reducer';
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import membersReducer from './Members/reducers';
import subscriptionsReducer from './Subscriptions/reducers';

const rootReducers = combineReducers({
  toast: toastReducer,
  classes: classReducer,
  members: membersReducer,
  subscriptions: subscriptionsReducer,
  trainers: trainersReducer
});

export default rootReducers;

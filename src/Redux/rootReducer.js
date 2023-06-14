import { combineReducers } from 'redux';

// Import reducers below
import toastReducer from './Shared/ResponseToast/reducer';
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import activititesReducer from './Activities/reducers';
import membersReducer from './Members/reducers';
import adminsReducer from './Admins/reducers';
import subscriptionsReducer from './Subscriptions/reducers';

const rootReducers = combineReducers({
  activities: activititesReducer,
  toast: toastReducer,
  classes: classReducer,
  members: membersReducer,
  admins: adminsReducer,
  subscriptions: subscriptionsReducer,
  trainers: trainersReducer
});

export default rootReducers;

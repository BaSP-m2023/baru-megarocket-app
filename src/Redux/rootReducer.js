import { combineReducers } from 'redux';
import subscriptionReducer from '../Redux/Subscriptions/reducers';

// Import reducers below
import toastReducer from './Shared/ResponseToast/reducer';
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import activititesReducer from './Activities/reducers';
import membersReducer from './Members/reducers';

const rootReducers = combineReducers({
  subscription: subscriptionReducer,
  toast: toastReducer,
  classes: classReducer,
  trainers: trainersReducer,
  members: membersReducer,
  activities: activititesReducer
});

export default rootReducers;

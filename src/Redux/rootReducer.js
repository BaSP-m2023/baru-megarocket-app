import { combineReducers } from 'redux';
import { superadminsReducer } from './SuperAdmins/reducers';

// Import reducers below
import toastReducer from './Shared/ResponseToast/reducer';
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import activititesReducer from './Activities/reducers';
import membersReducer from './Members/reducers';
import adminsReducer from './Admins/reducers';
import subscriptionsReducer from './Subscriptions/reducers';
import loginMembersReducer from './LoginMembers/reducers';
import authReducer from './Auth/reducer';

const rootReducers = combineReducers({
  superadmins: superadminsReducer,
  activities: activititesReducer,
  toast: toastReducer,
  classes: classReducer,
  members: membersReducer,
  admins: adminsReducer,
  subscriptions: subscriptionsReducer,
  trainers: trainersReducer,
  auth: authReducer
});

export default rootReducers;

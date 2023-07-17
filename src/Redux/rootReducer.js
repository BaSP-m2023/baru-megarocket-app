import { combineReducers } from 'redux';
import { superadminsReducer } from 'Redux/SuperAdmins/reducers';

// Import reducers below
import toastReducer from 'Redux/Shared/ResponseToast/reducer';
import trainersReducer from 'Redux/Trainers/reducers';
import classReducer from 'Redux/Classes/reducers';
import activititesReducer from 'Redux/Activities/reducers';
import membersReducer from 'Redux/Members/reducers';
import adminsReducer from 'Redux/Admins/reducers';
import subscriptionsReducer from 'Redux/Subscriptions/reducers';
import authReducer from 'Redux/Auth/reducer';
import darkReducer from 'Redux/DarkMode/reducer';

const rootReducers = combineReducers({
  darkmode: darkReducer,
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

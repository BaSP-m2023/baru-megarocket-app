import { combineReducers } from 'redux';
import { superadminsReducer } from './SuperAdmins/reducers';

// Import reducers below
import toastReducer from './Shared/ResponseToast/reducer';
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import activititesReducer from './Activities/reducers';
import membersReducer from './Members/reducers';

const rootReducers = combineReducers({
  superadmins: superadminsReducer,
  toast: toastReducer,
  classes: classReducer,
  trainers: trainersReducer,
  members: membersReducer,
  activities: activititesReducer
});

export default rootReducers;

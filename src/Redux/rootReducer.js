import { combineReducers } from 'redux';

// Import reducers below
import toastReducer from './Shared/ResponseToast/reducer';
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import activititesReducer from './Activities/reducers';
import membersReducer from './Members/reducers';
import adminsReducer from './Admins/reducers';

const rootReducers = combineReducers({
  toast: toastReducer,
  classes: classReducer,
  trainers: trainersReducer,
  members: membersReducer,
  activities: activititesReducer,
  admins: adminsReducer
});

export default rootReducers;

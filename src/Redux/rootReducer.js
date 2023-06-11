import { combineReducers } from 'redux';
import {
  superadminsReducer,
  addSuperadminReducer,
  editSuperadminReducer
} from './SuperAdmins/reducers';

// Import reducers below

const rootReducers = combineReducers({
  superadmins: superadminsReducer,
  newSuperadmin: addSuperadminReducer,
  editSuperadmin: editSuperadminReducer
});

export default rootReducers;

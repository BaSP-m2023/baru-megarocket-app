import { combineReducers } from 'redux';
import {
  superadminsReducer,
  addSuperadminReducer,
  editSuperadminReducer,
  deleteSuperadminReducer
} from './SuperAdmins/reducers';

// Import reducers below

const rootReducers = combineReducers({
  superadmins: superadminsReducer,
  newSuperadmin: addSuperadminReducer,
  editSuperadmin: editSuperadminReducer,
  deleteSuperadmin: deleteSuperadminReducer
});

export default rootReducers;

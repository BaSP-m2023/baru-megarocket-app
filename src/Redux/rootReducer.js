import { combineReducers } from 'redux';
import { superadminsReducer, addSuperadminReducer } from './SuperAdmins/reducers';

// Import reducers below

const rootReducers = combineReducers({
  superadmins: superadminsReducer,
  newSuperadmin: addSuperadminReducer
});

export default rootReducers;

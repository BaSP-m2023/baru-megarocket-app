import { combineReducers } from 'redux';
import { superadminsReducer } from './SuperAdmins/reducers';

// Import reducers below

const rootReducers = combineReducers({ superadmins: superadminsReducer });

export default rootReducers;

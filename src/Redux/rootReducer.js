import { combineReducers } from 'redux';
import subscriptionReducer from '../Redux/Subscriptions/reducers';

// Import reducers below

const rootReducers = combineReducers({
  subscription: subscriptionReducer
});

export default rootReducers;

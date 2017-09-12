import { combineReducers } from 'redux';
import * as orderReducer from './order';
import * as paymentReducer from './payment';
import * as navigationReducer from './navigation';

export default combineReducers(Object.assign(
  orderReducer,
  paymentReducer,
  navigationReducer,
));

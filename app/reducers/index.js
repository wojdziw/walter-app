import { combineReducers } from 'redux'
import * as orderReducer from './order';
import * as paymentReducer from './payment';

export default combineReducers(Object.assign(
  orderReducer,
  paymentReducer
));

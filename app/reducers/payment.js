import createReducer from '../config/createReducer';
import * as types from '../actions/types';

export const paymentUri = createReducer('', {
  [types.SET_PAYMENT_URI](state, action) {
    return action.paymentUri;
  },
});

export const transactionStatus = createReducer('', {
  [types.UPDATE_TRANSACTION_STATUS](state, action) {
    return action.transactionStatus;
  },
});

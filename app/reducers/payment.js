import createReducer from '../config/createReducer'
import * as types from '../actions/types'

export const paymentUri = createReducer("", {
  [types.SET_PAYMENT_URI](state, action) {
    state = action.paymentUri;
    return state;
  },
})

export const transactionStatus = createReducer("", {
  [types.UPDATE_TRANSACTION_STATUS](state, action) {
    state = action.transactionStatus;
    return state;
  }
})
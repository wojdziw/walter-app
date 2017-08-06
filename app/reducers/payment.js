import createReducer from '../config/createReducer'
import * as types from '../actions/types'

export const paymentUri = createReducer("", {
  [types.SET_PAYMENT_URI](state, action) {
    state = action.paymentUri;
    return state;
  },
})

export const orderStatus = createReducer("", {
  [types.UPDATE_ORDER_STATUS](state, action) {
    state = action.orderStatus;
    return state;
  }
})
import * as types from './types'

export function setPaymentUri(paymentUri) {
  return {
    type: types.SET_PAYMENT_URI,
    paymentUri
  }
}

export function fetchPaymentUri() {
  return(dispatch, getState) => {

    fetch('https://sheltered-plateau-48256.herokuapp.com/getPaymentUri?id='+getState().order.id+'&totalAmount='+(getState().order.total*100).toFixed(0))
    .then(response => {
    return response.text()
    })
    .then((responseText) => {
        dispatch(setPaymentUri(responseText))
    })
  }
}

export function updateOrderStatus(orderStatus) {
  return {
    type: types.UPDATE_ORDER_STATUS,
    orderStatus
  }
}

export function fetchOrderStatus() {
  return(dispatch, getState) => {
    fetch('https://sheltered-plateau-48256.herokuapp.com/getTransactionStatus?id='+getState().order.id)
    .then(response => {
    return response.text()
    })
    .then((responseText) => {
        dispatch(updateOrderStatus(responseText))
    })
  }
}
import * as types from './types'

export function setPaymentUri(paymentUri) {
  return {
    type: types.SET_PAYMENT_URI,
    paymentUri,
  };
}

export function fetchPaymentUri() {
  return (dispatch, getState) => {
    fetch(`https://sheltered-plateau-48256.herokuapp.com/getPaymentUri?id=${getState().order.id}&totalAmount=${(getState().order.total * 100).toFixed(0)}`)
      .then(response => response.text())
      .then((responseText) => {
        dispatch(setPaymentUri(responseText));
      });
  };
}

export function updateTransactionStatus(transactionStatus) {
  return {
    type: types.UPDATE_TRANSACTION_STATUS,
    transactionStatus,
  };
}

export function fetchTransactionStatus() {
  return (dispatch, getState) => {
    fetch(`https://sheltered-plateau-48256.herokuapp.com/getTransactionStatus?id=${getState().order.id}`)
      .then(response => response.text())
      .then((responseText) => {
        dispatch(updateTransactionStatus(responseText))
      });
  };
}

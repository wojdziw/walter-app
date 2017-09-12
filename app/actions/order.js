import * as types from './types';

export function chooseTable(number) {
  return {
    type: types.CHOOSE_TABLE,
    number,
  };
}

export function plusMenuPositionCount(id) {
  return {
    type: types.PLUS_MENU_POSITION_COUNT,
    id,
  };
}

export function minusMenuPositionCount(id) {
  return {
    type: types.MINUS_MENU_POSITION_COUNT,
    id,
  };
}

export function initializeMenuPositions(menuPositions) {
  return {
    type: types.INITIALIZE_MENU_POSITIONS,
    menuPositions,
  };
}

export function switchTip() {
  return {
    type: types.SWITCH_TIP,
  };
}

export function changeId() {
  return {
    type: types.CHANGE_ID,
  };
}

export function initializeMenu(jsonString) {
  return (dispatch) => {
    const jsonData = JSON.parse(jsonString);
    const menuPositions = Object.keys(jsonData).map(elem => jsonData[elem]);

    dispatch(initializeMenuPositions(menuPositions));
  };
}

export function fetchMenu() {
  return (dispatch) => {
    fetch('https://sheltered-plateau-48256.herokuapp.com/getMenuPositions/')
      .then(response => response.text())
      .then((responseText) => {
        dispatch(initializeMenu(responseText))
      });
  };
}

export function sendOrder() {
  return (dispatch, getState) => {
    const order = getState().order;
    order.tableNumber = getState().tableNumber;  
    order.time = new Date().toISOString();
    order.status = 0;

    fetch('https://rocky-garden-79199.herokuapp.com/postOrder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => console.log(response.text()));
  };
}

import createReducer from '../config/createReducer'
import * as types from '../actions/types'
import generateUUID from '../config/uuid'

export const tableNumber = createReducer("1", {
  [types.CHOOSE_TABLE](state, action) {
    return action.number;
  }
})

export const order = createReducer ({['id']: generateUUID(), ['total']: 0, ['tip']: false, ['items']: {}}, {
  [types.PLUS_MENU_POSITION_COUNT](state, action) {
    let menuPosition = state.items[action.id];

    let total = state['total'];
    menuPosition.count += 1;
    total += menuPosition.price;

    let items = state.items;
    items[action.id] = menuPosition;
    return {...state, ['items']: items, ['total']: total}
  },
  [types.MINUS_MENU_POSITION_COUNT](state, action) {
    let menuPosition = state.items[action.id];

    let total = state['total'];
    if (menuPosition.count-1>=0) {
      menuPosition.count -= 1;
      total -= menuPosition.price;
    }

    let items = state.items;
    items[action.id] = menuPosition;
    return {...state, ['items']: items, ['total']: total}
  },
  [types.INITIALIZE_MENU_POSITIONS](state, action) {
    action.menuPositions.forEach( (menuPosition) => {
      menuPosition['count'] = 0;
      state.items[menuPosition.id] = menuPosition;
    })
    state['total'] = 0;
    return state;
  },
  [types.SWITCH_TIP](state, action) {
    let include = state['tip'];
    let total = state['total'];
    if (total > 0) {
      if (include) {
        total -= total/11;
      } else {
        total += 0.1*total;
      }
    }
    return {...state, ['tip']: !include, ['total']: total}
  }
})
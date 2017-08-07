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
    let items = {}
    action.menuPositions.forEach( (menuPosition) => {
      menuPosition['count'] = 0;
      items[menuPosition.id] = menuPosition;
    })
    return {...state, ['items']: items, ['total']: 0};
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
  },
  [types.CHANGE_ID](state, action) {
    return {...state, ['id']: generateUUID()}
  },
})
import createReducer from '../config/createReducer'
import * as types from '../actions/types'

export const screen = createReducer("Tables", {
  [types.CHOOSE_SCREEN](state, action) {
    return action.name;
  }
})

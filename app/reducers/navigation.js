import createReducer from '../config/createReducer';
import * as types from '../actions/types';

const screen = createReducer('Tables', {
  [types.CHOOSE_SCREEN](state, action) {
    return action.name;
  },
});
export default screen;

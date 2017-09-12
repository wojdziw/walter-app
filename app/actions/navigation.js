import * as types from './types';

export function chooseScreen(name) {
  return {
    type: types.CHOOSE_SCREEN,
    name
  };
}

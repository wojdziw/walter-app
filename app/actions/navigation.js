import * as types from './types';

export default function chooseScreen(name) {
  return {
    type: types.CHOOSE_SCREEN,
    name,
  };
}

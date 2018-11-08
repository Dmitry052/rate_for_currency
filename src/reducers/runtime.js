/* @flow */
import { SET_RUNTIME_VARIABLE } from '../constants';

type Action = {
  type: string,
  payload: {
    name: string,
    value: string,
  },
};

export default function runtime(state: Object = {}, action: Action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}

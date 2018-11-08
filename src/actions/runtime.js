/* eslint-disable import/prefer-default-export */
/* @flow */
import { SET_RUNTIME_VARIABLE } from '../constants';

type Runtime = {
  name: string,
  value: string,
};

export function setRuntimeVariable({ name, value }: Runtime) {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value,
    },
  };
}

/* eslint-disable import/prefer-default-export, no-restricted-globals */
/* @flow */

import { INITIAL_CROSS, INITIAL_RATE, SET_PAIR_RATE } from './../constants';

export const setCross = (cross: Array<Array<string>>): any => (dispatch: Dispatch) => {
  dispatch({ type: INITIAL_CROSS, data: cross });
};

export const setPairData = (pair: string, data: Object): any => (dispatch: Dispatch) => {
  dispatch({ type: INITIAL_RATE, pair, data });
};

export const setPairRate = (pair: string, data: Object): any => (dispatch: Dispatch) => {
  dispatch({ type: SET_PAIR_RATE, pair, data });
};

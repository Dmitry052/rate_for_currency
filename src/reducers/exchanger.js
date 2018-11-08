/* @flow */
import { INITIAL_CROSS, INITIAL_RATE, SET_PAIR_RATE } from './../constants';

type Action = {
  type: string,
};

export const initialData = {
  currency: ['BTC', 'BCH', 'ETH', 'ETC', 'DASH'],
  rate: {
    [`BTC/BCH`]: {
      btc: 6499.98,
      bch: 616.98,
      rate: 1.34,
      history: {
        rate: 1.008,
      },
    },
    [`BTC/ETH`]: {
      btc: 6499.98,
      eth: 217,
      rate: 30,
      history: {
        rate: 1.008,
      },
    },
    [`BTC/ETC`]: {
      btc: 6499.98,
      etc: 9.43,
      rate: 100.34,
      history: {
        rate: 1.008,
      },
    },
    [`BTC/DASH`]: {
      btc: 6499.98,
      dash: 11.39,
      rate: 605.34,
      history: {
        rate: 1.008,
      },
    },
  },
  cross: [],
};

export default function exchanger(state: Object = initialData, action: Action) {
  switch (action.type) {
    case INITIAL_CROSS: {
      return { ...state, cross: action.data };
    }
    case INITIAL_RATE: {
      const { data, pair } = action;
      // #####################
      // For test
      if (state.rate[pair]) {
        return { ...state };
      }
      // #####################
      return { ...state, rate: { ...state.rate, [pair]: data } };
    }
    case SET_PAIR_RATE: {
      const { data, pair } = action;
      return { ...state, rate: { ...state.rate, [pair]: { ...state.rate[pair], rate: data } } };
    }
    default:
      return state;
  }
}

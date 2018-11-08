import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import exchanger from './exchanger';

export default combineReducers({
  user,
  runtime,
  exchanger,
});

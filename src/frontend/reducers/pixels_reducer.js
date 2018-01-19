import {
  RECEIVE_PIXELS,
} from '../actions/pixel_actions';
// object merge function
import merge from 'lodash/merge';

const pixelsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_PIXELS:
      newState = merge({}, action.pixels);
      return newState;
    default:
      return oldState;
  }
};

export default pixelsReducer;

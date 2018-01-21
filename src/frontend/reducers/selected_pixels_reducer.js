import {
  ADD_PIXELS_DRAW
} from '../actions/pixel_actions';
// object merge function
// import merge from 'lodash/merge';

const pixelsReducer = (oldState = {'draw':[],'buy':[]}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case ADD_PIXELS_DRAW:
      newState = oldState;
      let selectedPixelsDraw = {'draw': oldState.draw.concat([action.selectedPixelsDraw])};
      newState = Object.assign({}, selectedPixelsDraw);
      return newState;
    default:
      return oldState;
  }
};

export default pixelsReducer;

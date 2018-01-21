import {
  ADD_SELECTED_PIXELS_DRAW,
  ADD_SELECTED_PIXELS_BUY,
  ADD_SELECTED_PIXELS_RENT
} from '../actions/pixel_actions';
// object merge function
// import merge from 'lodash/merge';

const pixelsReducer = (oldState = {'draw':[],'buy':[], 'rent':[]}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case ADD_SELECTED_PIXELS_DRAW:
      newState = Object.assign({}, oldState);
      let selectedPixelsDraw = {'draw': oldState.draw.concat([action.selectedPixelsDraw])};
      newState = Object.assign(newState, selectedPixelsDraw);
      return newState;
    case ADD_SELECTED_PIXELS_BUY:
      newState = Object.assign({}, oldState);
      let selectedPixelsBuy = {'buy': oldState.buy.concat([action.selectedPixelsBuy])};
      newState = Object.assign(newState, selectedPixelsBuy);
      return newState;
    case ADD_SELECTED_PIXELS_RENT:
      newState = Object.assign({}, oldState);
      let selectedPixelsRent = {'rent': oldState.rent.concat([action.selectedPixelsRent])};
      newState = Object.assign(newState, selectedPixelsRent);
      return newState;
    default:
      return oldState;
  }
};

export default pixelsReducer;

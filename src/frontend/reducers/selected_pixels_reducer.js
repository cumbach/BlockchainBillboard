import {
  ADD_SELECTED_PIXELS_DRAW,
  ADD_SELECTED_PIXELS_BUY,
  ADD_SELECTED_PIXELS_RENT
} from '../actions/pixel_actions';
// object merge function
// import merge from 'lodash/merge';

const pixelsReducer = (oldState = {'draw':{},'buy':{}, 'rent':{}, 'manage': {}}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case ADD_SELECTED_PIXELS_DRAW:
      newState = Object.assign({}, oldState);
      newState.draw[action.selectedPixelsDraw[0]] = action.selectedPixelsDraw.slice(1,5);
      return newState;
    case ADD_SELECTED_PIXELS_BUY:
      newState = Object.assign({}, oldState);
      newState.buy[action.selectedPixelsBuy[0]] = action.selectedPixelsBuy.slice(1,5);
      return newState;
    case ADD_SELECTED_PIXELS_RENT:
      newState = Object.assign({}, oldState);
      newState.rent[action.selectedPixelsRent[0]] = action.selectedPixelsRent.slice(1,5);
      return newState;
    default:
      return oldState;
  }
};

export default pixelsReducer;

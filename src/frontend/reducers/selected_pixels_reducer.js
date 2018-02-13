import {
  ADD_SELECTED_PIXEL,
  REMOVE_SELECTED_PIXEL
} from '../actions/pixel_actions';
// object merge function
// import merge from 'lodash/merge';

const pixelsReducer = (oldState = {'draw':{},'buy':{}, 'rent':{}, 'manage': {}}, action) => {
  Object.freeze(oldState);
  let newState;
  let currentTab = action.currentTab;
  let currentTabPixels;
  let pixel;

  switch (action.type) {
    case ADD_SELECTED_PIXEL:
      currentTab = action.currentTab;
      pixel = action.selectedPixelToAdd;
      newState = Object.assign({}, oldState);
      currentTabPixels = newState[currentTab];
      currentTabPixels[pixel[0]] = action.selectedPixelToAdd.slice(1,5);
      return newState;
    case REMOVE_SELECTED_PIXEL:
      currentTab = action.currentTab;
      pixel = action.selectedPixelToRemove;
      newState = Object.assign({}, oldState);
      currentTabPixels = newState[currentTab];
      delete currentTabPixels[pixel];
      return newState;
    default:
      return oldState;
  }
};

export default pixelsReducer;

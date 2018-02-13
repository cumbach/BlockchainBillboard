import * as ProjectUtil from '../util/projectUtil';

export const RECEIVE_PIXELS = "RECEIVE_PIXELS";
export const REMOVE_SELECTED_PIXEL = "REMOVE_SELECTED_PIXEL";
export const ADD_SELECTED_PIXEL = "ADD_SELECTED_PIXEL";


export const receivePixels = pixels => ({
  type: RECEIVE_PIXELS,
  pixels
});

export const removeSelectedPixelAction = (currentTab, selectedPixelToRemove) => ({
  type: REMOVE_SELECTED_PIXEL,
  currentTab,
  selectedPixelToRemove,
});

export const addSelectedPixelAction = (currentTab, selectedPixelToAdd) => ({
  type: ADD_SELECTED_PIXEL,
  currentTab,
  selectedPixelToAdd,
});



export const requestPixels = (instance, account) => dispatch => (
  ProjectUtil.getPixels(instance, account)
  .then(pixels => dispatch(receivePixels(pixels)))
);

export const buyPixels = (instance, account, pixels) => dispatch => (
  ProjectUtil.buyPixels(instance, account, pixels)
);

export const rentPixels = (instance, account, pixels) => dispatch => (
  ProjectUtil.rentPixels(instance, account, pixels)
);

export const addSelectedPixel = (currentTab, selectedPixel) => dispatch => (
  dispatch(addSelectedPixelAction(currentTab, selectedPixel))
);

export const removeSelectedPixel = (currentTab, selectedPixel) => dispatch => (
  dispatch(removeSelectedPixelAction(currentTab, selectedPixel))
);

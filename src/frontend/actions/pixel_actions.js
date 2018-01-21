import * as ProjectUtil from '../util/projectUtil';

export const RECEIVE_PIXELS = "RECEIVE_PIXELS";
export const PURCHASE_PIXELS = "PURCHASE_PIXELS";
export const ADD_PIXELS_DRAW = "ADD_PIXELS_DRAW";


export const receivePixels = pixels => ({
  type: RECEIVE_PIXELS,
  pixels
});

export const purchasePixels = pixels => ({
  type: PURCHASE_PIXELS,
  pixels
});

export const addDrawSelected = selectedPixelsDraw => ({
  type: ADD_PIXELS_DRAW,
  selectedPixelsDraw
});


export const requestPixels = (instance, account) => dispatch => (
  ProjectUtil.getPixels(instance, account)
  .then(pixels => dispatch(receivePixels(pixels)))
);

export const buyPixels = (instance, account, pixels) => dispatch => (
  ProjectUtil.buyPixels(instance, account, pixels)
);

export const addSelectedPixelDraw = (selectedPixel) => dispatch => (
  dispatch(addDrawSelected(selectedPixel))
);

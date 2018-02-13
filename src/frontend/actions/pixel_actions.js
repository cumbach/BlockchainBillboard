import * as ProjectUtil from '../util/projectUtil';

export const RECEIVE_PIXELS = "RECEIVE_PIXELS";
// export const PURCHASE_PIXELS = "PURCHASE_PIXELS";
export const ADD_SELECTED_PIXELS_DRAW = "ADD_SELECTED_PIXELS_DRAW";
export const ADD_SELECTED_PIXELS_BUY = "ADD_SELECTED_PIXELS_BUY";
export const ADD_SELECTED_PIXELS_RENT = "ADD_SELECTED_PIXELS_RENT";
export const REMOVE_SELECTED_PIXEL = "REMOVE_SELECTED_PIXEL";

export const receivePixels = pixels => ({
  type: RECEIVE_PIXELS,
  pixels
});

// export const purchasePixels = pixels => ({
//   type: PURCHASE_PIXELS,
//   pixels
// });

export const addDrawSelected = selectedPixelsDraw => ({
  type: ADD_SELECTED_PIXELS_DRAW,
  selectedPixelsDraw
});

export const addBuySelected = selectedPixelsBuy => ({
  type: ADD_SELECTED_PIXELS_BUY,
  selectedPixelsBuy
});

export const addRentSelected = selectedPixelsRent => ({
  type: ADD_SELECTED_PIXELS_RENT,
  selectedPixelsRent
});

export const removeSelectedPixelAction = (currentTab, selectedPixelToRemove) => ({
  type: REMOVE_SELECTED_PIXEL,
  currentTab,
  selectedPixelToRemove,
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

export const addSelectedPixelDraw = (selectedPixel) => dispatch => (
  dispatch(addDrawSelected(selectedPixel))
);

export const addSelectedPixelBuy = (selectedPixel) => dispatch => (
  dispatch(addBuySelected(selectedPixel))
);

export const addSelectedPixelRent = (selectedPixel) => dispatch => (
  dispatch(addRentSelected(selectedPixel))
);

export const removeSelectedPixel = (currentTab, selectedPixel) => dispatch => (
  dispatch(removeSelectedPixelAction(currentTab, selectedPixel))
);

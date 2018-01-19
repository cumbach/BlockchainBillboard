import * as ProjectUtil from '../util/projectUtil';

export const RECEIVE_PIXELS = "RECEIVE_PIXELS";
export const ADD_PIXELS = "ADD_PIXELS";

export const receivePixels = pixels => ({
  type: RECEIVE_PIXELS,
  pixels
});

export const addPixels = pixels => ({
  type: ADD_PIXELS,
  pixels
});


export const requestPixels = (instance, account) => dispatch => (
  ProjectUtil.getPixels(instance, account)
  .then(pixels => dispatch(receivePixels(pixels)))
);

export const buyPixels = (instance, account, pixels) => dispatch => (
  ProjectUtil.buyPixels(instance, account, pixels)
  .then(pixels => dispatch(addPixels(pixels)))
);

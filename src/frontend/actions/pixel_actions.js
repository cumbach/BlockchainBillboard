import * as ProjectUtil from '../util/projectUtil';

export const RECEIVE_PIXELS = "RECEIVE_PIXELS";

export const receivePixels = pixels => ({
  type: RECEIVE_PIXELS,
  pixels
});

export const requestPixels = (instance, account) => dispatch => (
  ProjectUtil.getPixels(instance, account)
  .then(pixels => dispatch(receivePixels(pixels)))
);

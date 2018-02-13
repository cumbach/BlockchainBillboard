import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { requestPixels, buyPixels, addSelectedPixelDraw } from '../actions/pixel_actions';
import * as PixelActions from '../actions/pixel_actions';
import MainApplication from './main_application';

const mapStateToProps = state => {
  return ({
    pixels: state.pixels,
    web3: state.web3,
    accounts: state.accounts,
    selectedPixels: state.selectedPixels
  });
};

const mapDispatchToProps = dispatch => ({
  requestPixels: (instance, account) => dispatch(PixelActions.requestPixels(instance, account)),
  buyPixels: (instance, account, pixels) => dispatch(PixelActions.buyPixels(instance, account, pixels)),
  rentPixels: (instance, account, pixels) => dispatch(PixelActions.rentPixels(instance, account, pixels)),
  addPixelDraw: (selectedPixel) => dispatch(PixelActions.addSelectedPixelDraw(selectedPixel)),
  addPixelBuy: (selectedPixel) => dispatch(PixelActions.addSelectedPixelBuy(selectedPixel)),
  addPixelRent: (selectedPixel) => dispatch(PixelActions.addSelectedPixelRent(selectedPixel)),
  removeSelectedPixel: (tab, selectedPixel) => dispatch(PixelActions.removeSelectedPixel(tab, selectedPixel))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApplication));

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
  addSelectedPixel: (tab, selectedPixel) => dispatch(PixelActions.addSelectedPixel(tab, selectedPixel)),
  removeSelectedPixel: (tab, selectedPixel) => dispatch(PixelActions.removeSelectedPixel(tab, selectedPixel))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApplication));

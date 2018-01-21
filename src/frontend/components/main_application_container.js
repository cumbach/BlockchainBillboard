import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestPixels, buyPixels, addSelectedPixelDraw } from '../actions/pixel_actions';
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
  requestPixels: (instance, account) => dispatch(requestPixels(instance, account)),
  buyPixels: (instance, account, pixels) => dispatch(buyPixels(instance, account, pixels)),
  addPixelDraw: (selectedPixel) => dispatch(addSelectedPixelDraw(selectedPixel))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApplication));

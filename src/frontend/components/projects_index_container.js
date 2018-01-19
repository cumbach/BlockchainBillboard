import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestPixels, buyPixels } from '../actions/pixel_actions';
import ProjectsIndex from './projects_index';

const mapStateToProps = state => {
  return ({
    pixels: state.projects,
    web3: state.web3,
    accounts: state.accounts
  });
};

const mapDispatchToProps = dispatch => ({
  requestPixels: (instance, account) => dispatch(requestPixels(instance, account)),
  buyPixels: (instance, account, pixels) => dispatch(buyPixels(instance, account, pixels))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsIndex));

import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Root from './root';
import { fetchAccounts, getWeb3 } from '../util/getWeb3';
class RootApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      store: this.props.store,
      web3: null
    }
  };

  componentWillMount() {
    // Sets up web3 and user account (must be on Metamask), see util/getWeb3
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      });
      fetchAccounts(results.web3);
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  render(){
    return (
      <Provider store={this.state.store}>
        <HashRouter>
          <Root />
        </HashRouter>
      </Provider>
    )
  }
}

export default RootApp;

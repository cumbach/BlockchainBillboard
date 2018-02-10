import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class TabulatedCosts extends React.Component {
  render() {
    const fee = this.props.transactionCosts ? this.props.transactionCosts.buy : 0;

    return (
      <div className='tabulated-costs'>
        <strong>Tabulated Costs</strong>
        <div>Estimated Gas Fee: {fee}</div>
      </div>
    );
  }
}

export default TabulatedCosts;

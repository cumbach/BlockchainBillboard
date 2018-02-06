import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class SetNewPrice extends React.Component {
  render() {
    return (
      <div className='set-new-price-container'>
        <strong>Set New Price:</strong>
        <input className='new-price'
               placeholder='New Price (Ether)'/>
      </div>
    );
  }
}

export default SetNewPrice;

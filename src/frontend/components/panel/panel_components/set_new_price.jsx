import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class SetNewPrice extends React.Component {
  render() {
    return (
      <div className='set-new-price-container'>
        <input className='set-new-price'
               placeholder='Set New Price'/>
      </div>
    );
  }
}

export default SetNewPrice;

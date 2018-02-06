import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class RentableToggle extends React.Component {
  render() {
    return (
      <div className='allow-renting-container'>
         <div>
           <strong>Allow Renting?</strong>
           <input type="checkbox" defaultChecked="true" id="allowRenting"></input>
         </div>
      </div>
    );
  }
}

export default RentableToggle;

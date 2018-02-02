import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <div className='bb-navbar'>
        <div className='nav-item bb-title'>Blockchain Billboard</div>
        <div className='nav-item about'>About</div>
        <div className='nav-item how-to'>How To</div>
      </div>
    );
  }
}

export default NavBar;

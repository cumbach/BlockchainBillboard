import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class SelectedPixels extends React.Component {
  render() {
    return (
      <div className='selected-pixels'>
        <strong>Selected Pixels</strong>
        <div className='selected-pixels-container'>
          {this.props.selectedPixels.map(pixels => '[' + pixels[0] + ', ' + pixels[1] +']')}
        </div>
      </div>
    );
  }
}

export default SelectedPixels;

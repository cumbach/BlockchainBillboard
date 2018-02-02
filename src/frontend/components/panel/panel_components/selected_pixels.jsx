import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class SelectedPixels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.showSelectedPixels = this.showSelectedPixels.bind(this);

  }

  showSelectedPixels() {
    return (
      <div className='selected-pixels-container'>
        {this.props.selectedPixels.map((pixel, i) => {
          const colorArray = pixel.slice(1,5).join(',');
          const color = 'rgba(' + colorArray + ')';
          return <div key={i} className='color-selected' style={{'background': color}}></div>
        })}
      </div>
    )
  }

  render() {
    return (
      <div className='selected-pixels'>
        <strong>Selected Pixels</strong>
        {this.showSelectedPixels()}
      </div>
    );
  }
}

export default SelectedPixels;

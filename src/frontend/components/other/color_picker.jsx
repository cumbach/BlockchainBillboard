import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

const colors = [
  'rgb(255, 255, 255)',
  'rgb(196, 196, 196)',
  'rgb(136, 136, 136)',
  'rgb(34, 34, 34)',
  'rgb(255, 167, 209)',
  'rgb(299, 0, 0)',
  'rgb(299, 149, 0)',
  'rgb(160, 106, 66)',
  'rgb(238, 226, 0)',
  'rgb(148, 224, 68)',
  'rgb(2, 190, 1)',
  'rgb(0, 211, 221)',
  'rgb(0, 131, 199)',
  'rgb(0, 0, 234)',
  'rgb(207, 110, 228)',
  'rgb(130, 0, 128)',
  'rgb(255, 223, 204)'
]

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: {},
      instance: null,
      scale: 0.7,
      position: [-170,-90],
      pixelArray: [],
      currentTab: 'draw',
      commentLink: ['','']
    };

    this.mapColorsToSquares = this.mapColorsToSquares.bind(this);
    this.clickColor = this.clickColor.bind(this);

  }

  clickColor(e) {
    this.props.setColoringColor(e.target.style.background)
  }

  mapColorsToSquares() {
    const self = this;
    return (
      <div className='color-picker'>
        {colors.map((color, i) => {
          return <div key={i} onClick={self.clickColor} className='color-choice' style={{'background': color}}></div>
        })}
      </div>
    )
  }

  render() {
    return (
      <div className='color-picker-container'>
        {this.mapColorsToSquares()}
      </div>
    );
  }
}

export default ColorPicker;

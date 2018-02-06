/* eslint no-mixed-operators: 0 */
import React from 'react';
import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // pixels: {},
      // instance: null
    };

    this.draw = this.draw.bind(this)
    this.animate = this.animate.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getPositions = this.getPositions.bind(this)
    this.comparePositions = this.comparePositions.bind(this)
    this.createPixelArray = this.createPixelArray.bind(this)
    this.convertUint32ToColorArray = this.convertUint32ToColorArray.bind(this)
    this.isValidSelection = this.isValidSelection.bind(this)
    this.sideLength = 100;
    this.sideHeight = 100;
  }

  componentWillMount(){
  }

  componentDidMount() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.ctx = this.canvas.getContext('2d');
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    this.handleClick();
    this.animate();
  }

  handleClick() {
    const self = this;

    // If a user clicks on the canvas, get the position clicked and then iterate
    // through the pixels to see if there is a match for the location
    $('.camera-controller').click(function (e) {
      const newRect = this.getBoundingClientRect();
      const x = e.pageX - newRect.x;
      const y = e.pageY - newRect.y;
      const clicked = {'Left': x,'Top': y, 'Width': 1,'Height': 1};
      const pos = self.getPositions(clicked);

      const scale = self.props.scale;
      for (let i = 0; i < self.state.pixelArray.length; i++) {
        let pixel = self.state.pixelArray[i];
        let level = Math.floor(pixel[0] / self.sideLength);
        let column = Math.floor(pixel[0] % self.sideHeight);
        let current = {'Left': column * scale,'Top': level * scale, 'Width': scale,'Height': scale}
        let pos2 = self.getPositions(current);
        let horizontalMatch = self.comparePositions(pos[0], pos2[0]);
        let verticalMatch = self.comparePositions(pos[1], pos2[1]);
        if (horizontalMatch && verticalMatch) {
          if (self.isValidSelection(i)) {
            self.props.addSelectedPixels(self.state.pixelArray[i])
          }
          return;
        }
      }
    });
  }

  // Called from handleClick
  getPositions(item) {
    return [[item.Left, item.Left + item.Width], [item.Top, item.Top + item.Height]];
  }

  // Called from handleClick
  comparePositions(p1, p2) {
      let x1 = p1[0] < p2[0] ? p1 : p2;
      let x2 = p1[0] < p2[0] ? p2 : p1;
      return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
  }

  isValidSelection(pixelId) {
    if ((this.props.currentTab === 'draw' || this.props.currentTab === 'rent') && !this.props.pixels[pixelId]) {
      return false;
    }

    return ((this.props.currentTab === 'buy' && !this.props.pixels[pixelId]) ||
            (this.props.currentTab === 'draw' && this.props.pixels[pixelId].squatable) ||
            (this.props.currentTab === 'rent' && this.props.pixels[pixelId].rentable) ||
            (this.props.currentTab === 'buy' && this.props.pixels[pixelId].buyable));
  }

  animate() {
    this.ctx.clearRect(0, 0, this.sideLength, this.sideHeight);

    this.createPixelArray();
    // this.draw();
    // requestAnimationFrame(this.animate.bind(this));
  }

  convertUint32ToColorArray(uint32) {
    return [
      uint32 >> 24 & 0xFF,
      uint32 >> 16 & 0xFF,
      uint32 >> 8 & 0xFF,
      uint32 & 0xFF
    ];
  }

  sortSelectedPixels() {
    const sortedSelected = this.props.selectedPixels[this.props.currentTab];
    const result = {};
    for (var i = 0; i < sortedSelected.length; i++) {
      let currentPixel = sortedSelected[i]
      result[currentPixel[0]] = [currentPixel[1], currentPixel[2], currentPixel[3], 255];
    }
    return result;
  }

  createPixelArray() {
    let result = [];
    if (Object.keys(this.props.pixels).length === 0) {
      return;
    }
    const receivedPixels = this.props.pixels;
    const orderedSelectedPixels = this.sortSelectedPixels();

    for (var i = 0; i < this.sideHeight * this.sideLength; i++) {
      const currentPixel = receivedPixels[i];
      const currentSelectedPixel = orderedSelectedPixels[i];
      let r;
      let g;
      let b;
      let a;
      if (currentSelectedPixel) {
        r = currentSelectedPixel[0];
        g = currentSelectedPixel[1];
        b = currentSelectedPixel[2];
        a = currentSelectedPixel[3];
      } else if (currentPixel) {
        if ((this.props.currentTab === 'draw' && currentPixel.squatable) ||
            (this.props.currentTab === 'rent' && currentPixel.rentable) ||
            (this.props.currentTab === 'buy' && currentPixel.buyable)) {
          var colors = this.convertUint32ToColorArray(currentPixel.color)
          r = colors[0];
          g = colors[1];
          b = colors[2];
          a = 255;
        }
      } else {
        // r = Math.floor(Math.random() * 255);
        // g = Math.floor(Math.random() * 255);
        // b = Math.floor(Math.random() * 255);
        // a = Math.floor(Math.random() * 255);
        r = 100;
        g = 100;
        b = 100;
        a = 255;

      }
      let color = [r, g, b, a];
      result.push([i, color]);
    }
    this.setState({'pixelArray': result}, function(){ this.draw() });
  }

  draw() {
    const clampedArrayLength = (this.sideLength * this.sideHeight) * 4;
    const clampedArray = new Uint8ClampedArray(clampedArrayLength);

    for (var i = 0; i < this.state.pixelArray.length; i++) {
      for (var j = 0; j < 4; j++) {
        // Go through each pixel and add its component colors to the clamped array
        clampedArray[(i*4) + j] = this.state.pixelArray[i][1][j];
      }
    }

    let imageData = new ImageData(clampedArray, this.sideLength);
    this.ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <canvas id='canvas' width={this.sideLength} height={this.sideHeight}></canvas>
    );
  }
}

export default Canvas;

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
    this.sideLength = 1280;
    this.sideHeight = 720;
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
      for (let i = 0; i < self.props.pixelArray.length; i++) {
        let pixel = self.props.pixelArray[i];
        let current = {'Left': pixel[0] * scale,'Top': pixel[1] * scale, 'Width': scale,'Height': scale}
        let pos2 = self.getPositions(current);
        let horizontalMatch = self.comparePositions(pos[0], pos2[0]);
        let verticalMatch = self.comparePositions(pos[1], pos2[1]);
        if (horizontalMatch && verticalMatch) {
          self.props.addSelectedPixels(self.props.pixelArray[i])
          console.log(self.props.pixelArray[i]);
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

  animate() {
    this.ctx.clearRect(0, 0, this.sideLength, this.sideHeight);

    this.draw();
    // requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    const clampedArrayLength = (this.sideLength * this.sideHeight) * 4;
    const clampedArray = new Uint8ClampedArray(clampedArrayLength);

    for (var i = 0; i < this.props.pixelArray.length; i++) {
      for (var j = 0; j < 4; j++) {
        // Go through each pixel and add its component colors to the clamped array
        clampedArray[(i*4) + j] = this.props.pixelArray[i][2][j];
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

import React from 'react';
// import $ from "jquery";
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
    this.sideLength = 500;
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
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.sideLength, this.sideLength);

    this.draw();
    // requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    // this.ctx.fillStyle = 'black';
    // this.ctx.fillRect(0, 0, 500, 500);
    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(10, 10, 1, 1);
    for (var i = 0; i < this.props.pixelArray.length; i++) {
      this.ctx.fillStyle = this.props.pixelArray[i][2];
      let x = this.props.pixelArray[i][0];
      let y = this.props.pixelArray[i][1];
      this.ctx.fillRect(x, y, 1, 1);
    }
  }

  render() {
    return (
      <canvas width={this.sideLength} height={this.sideLength}></canvas>
    );
  }
}

export default Canvas;

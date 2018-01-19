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
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this)
    this.setKey = this.setKey.bind(this)
    this.moveCamera = this.moveCamera.bind(this)
    this.controlZoom = this.controlZoom.bind(this)
    this.createPixelArray = this.createPixelArray.bind(this)
    this.sideLength = 500;
    this.left = 0;
    this.top = 0;
    this.scale = 1;

    this.createPixelArray();
  }

  componentWillMount(){
    this.bindKeyHandlers();
  }

  createPixelArray() {
    if (this.pixelArray) {
      return;
    } else {
      this.pixelArray = [];
    }
    for (var i = 0; i < this.sideLength; i++) {
      for (var j = 0; j < this.sideLength; j++) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let color = 'rgb(' + r + ',' + g + ',' + b + ')';
        this.pixelArray.push([i, j, color]);
      }
    }
  }


  bindKeyHandlers() {
    const self = this;
    this.pressedKeys = {};
    document.addEventListener('keydown', function(e) {
      self.setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
      self.setKey(e, false);
    });
  }

  setKey(event, status) {
    var code = event.keyCode;
    var key;
    console.log(code);

    switch(code) {
    case 37:
        key = 'left'; break;
    case 38:
        key = 'up'; break;
    case 39:
        key = 'right'; break;
    case 40:
        key = 'down'; break;
    case 81:
        key = 'Q'; break;
    case 87:
        key = 'W'; break;
    default:
        key = String.fromCharCode(code);
    }
    this.pressedKeys[key] = status;
    this.moveCamera();
    this.controlZoom();
  }

  controlZoom() {
    const zoom = $('.zoom-controller').eq(0);
    const keyButtons = Object.keys(this.pressedKeys);
    for (var i = 0; i < keyButtons.length; i++) {
      if (this.pressedKeys[keyButtons[i]]) {
        console.log(keyButtons[i]);
        switch(keyButtons[i]) {
          case 'Q':
            this.scale += .1;
            zoom.css('transform', 'scale(' + this.scale + ')');
            break;
          case 'W':
            this.scale -= .1;
            zoom.css('transform', 'scale(' + this.scale + ')');
            break;
          default:
            return;
        }
      }
    }
  }

  moveCamera() {
    const camera = $('.camera-controller').eq(0);
    const keyButtons = Object.keys(this.pressedKeys);
    for (var i = 0; i < keyButtons.length; i++) {
      if (this.pressedKeys[keyButtons[i]]) {
        console.log(keyButtons[i]);
        switch(keyButtons[i]) {
          case 'left':
            this.left -= 5;
            camera.css('left', this.left+'px');
            break;
          case 'right':
            this.left += 5;
            camera.css('left', this.left+'px');
            break;
          case 'up':
            this.top -= 5;
            camera.css('top', this.top+'px');
            break;
          case 'down':
            this.top += 5;
            camera.css('top', this.top+'px');
            break;
          default:
            return;
        }
      }
    }
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
    for (var i = 0; i < this.pixelArray.length; i++) {
      this.ctx.fillStyle = this.pixelArray[i][2];
      let x = this.pixelArray[i][0];
      let y = this.pixelArray[i][1];
      this.ctx.fillRect(x, y, 1, 1);
    }
  }

  render() {
    return (
      <div className="zoom-controller">
        <div className="camera-controller">
          <canvas width="500" height="500"></canvas>
        </div>
      </div>
    );
  }
}

export default Canvas;

import React from 'react';
import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

// props:
// this.props.project: JSON of projects data which includes id, title,
//  description, and imageUrl
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
  }

  componentWillMount(){
    this.left = 0;
    this.top = 0;
    this.scale = 1;
    this.bindKeyHandlers();
    // this.handleContract();
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
  }

  animate() {
    this.ctx.clearRect(0, 0, 500, 500);
    // step
    // draw
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, 500, 500);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(10, 10, 20, 20);
  }


  render() {
    return(
      <div className="zoom-controller">
        <div className="camera-controller">
          <div onClick={this.animate.bind(this)}>Testing</div>
          <canvas width="500" height="500"></canvas>
        </div>
      </div>
    );
  }
}

export default Canvas;

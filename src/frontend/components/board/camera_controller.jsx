import React from 'react';
import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import Canvas from './canvas';


class CameraController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // pixels: {},
      // instance: null
    };

    this.bindKeyHandlers = this.bindKeyHandlers.bind(this)
    this.setKey = this.setKey.bind(this)
    this.moveCamera = this.moveCamera.bind(this)
    this.moveCameraToCurrentPosition = this.moveCameraToCurrentPosition.bind(this)
    this.left = 0;
    this.top = 0;
    this.pressedKeys = {};
  }

  componentDidMount(){
    this.bindKeyHandlers();
    this.moveCameraToCurrentPosition();
  }

  moveCameraToCurrentPosition() {
    const camera = $('.camera-controller').eq(0);
    camera.css('left', this.props.position[0]+'px');
    camera.css('top', this.props.position[1]+'px');
  }

  componentWillUnmount() {
    $('html').off();
  }


  bindKeyHandlers() {
    const self = this;
    $('html').keydown(function(e){
      self.setKey(e, true);
    });
    $('html').keyup(function(e){
      self.setKey(e, false);
    });
  }

  setKey(event, status) {
    var code = event.keyCode;
    var key;

    switch(code) {
    case 37:
        key = 'left'; break;
    case 38:
        key = 'up'; break;
    case 39:
        key = 'right'; break;
    case 40:
        key = 'down'; break;
    default:
        key = String.fromCharCode(code);
    }
    this.pressedKeys[key] = status;
    this.moveCamera();
  }


  moveCamera() {
    const keyButtons = Object.keys(this.pressedKeys);
    for (var i = 0; i < keyButtons.length; i++) {
      if (this.pressedKeys[keyButtons[i]]) {
        const movementSpeed = (10/this.props.scale > 1) ? (10/this.props.scale) : 1;
        switch(keyButtons[i]) {
          case 'left':
            this.props.adjustCameraPosition('left', movementSpeed)
            break;
          case 'right':
            this.props.adjustCameraPosition('left', -movementSpeed)
            break;
          case 'up':
            this.props.adjustCameraPosition('top', movementSpeed)
            break;
          case 'down':
            this.props.adjustCameraPosition('top', -movementSpeed)
            break;
          default:
            return;
        }
      }
    }
  }

  render() {
    return (
      <div className="camera-controller">
        <Canvas
          pixelArray={this.props.pixelArray}
          scale={this.props.scale}
          addSelectedPixels={this.props.addSelectedPixels}/>
      </div>
    );
  }
}

export default CameraController;

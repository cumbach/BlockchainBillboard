import React from 'react';
import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import CameraController from './camera_controller';


class ZoomController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // pixels: {},
      // instance: null
    };

    this.bindKeyHandlers = this.bindKeyHandlers.bind(this)
    this.setKey = this.setKey.bind(this)
    this.controlZoom = this.controlZoom.bind(this)
    this.zoomToCurrentScale = this.zoomToCurrentScale.bind(this)
    this.pressedKeys = {};
  }

  componentDidMount(){
    this.bindKeyHandlers();
    this.zoomToCurrentScale();
  }

  zoomToCurrentScale() {
    const zoom = $('.zoom-controller').eq(0);
    zoom.css('transform', 'scale(' + this.props.scale + ')');
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
    case 81:
        key = 'Q'; break;
    case 87:
        key = 'W'; break;
    default:
        key = String.fromCharCode(code);
    }
    this.pressedKeys[key] = status;
    this.controlZoom();
  }

  controlZoom() {
    const keyButtons = Object.keys(this.pressedKeys);
    for (var i = 0; i < keyButtons.length; i++) {
      if (this.pressedKeys[keyButtons[i]]) {
        switch(keyButtons[i]) {
          case 'Q':
            this.props.adjustScale(1.05);
            break;
          case 'W':
            this.props.adjustScale(0.95);
            break;
          default:
            return;
        }
      }
    }
  }

  render() {
    return (
      <div className="zoom-controller">
        <CameraController
          pixelArray={this.props.pixelArray}
          pixels={this.props.pixels}
          scale={this.props.scale}
          position={this.props.position}
          adjustCameraPosition={this.props.adjustCameraPosition}
          addSelectedPixels={this.props.addSelectedPixels}/>
      </div>
    );
  }
}

export default ZoomController;

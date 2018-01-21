import React from 'react';
import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import CameraController from './camera_controller';


class ZoomController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1
      // pixels: {},
      // instance: null
    };

    this.bindKeyHandlers = this.bindKeyHandlers.bind(this)
    this.setKey = this.setKey.bind(this)
    this.controlZoom = this.controlZoom.bind(this)
    this.scale = 1;
    this.pressedKeys = {};
  }

  componentDidMount(){
    this.bindKeyHandlers();
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
    const zoom = $('.zoom-controller').eq(0);
    const keyButtons = Object.keys(this.pressedKeys);
    for (var i = 0; i < keyButtons.length; i++) {
      if (this.pressedKeys[keyButtons[i]]) {
        switch(keyButtons[i]) {
          case 'Q':
            this.scale *= 1.2;
            this.setState({'scale': this.scale});
            zoom.css('transform', 'scale(' + this.scale + ')');
            break;
          case 'W':
            this.scale *= .8;
            this.setState({'scale': this.scale});
            zoom.css('transform', 'scale(' + this.scale + ')');
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
          scale={this.state.scale}
          addSelectedPixels={this.props.addSelectedPixels}/>
      </div>
    );
  }
}

export default ZoomController;

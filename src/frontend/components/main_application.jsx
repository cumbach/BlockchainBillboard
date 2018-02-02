import React from 'react';
// import ReactDOM from 'react-dom';
import ZoomController from './board/zoom_controller';
import NavBar from './other/nav_bar';
import PanelContainer from './panel/panel_container';
import ColorPicker from './other/color_picker';


// import { Link } from 'react-router-dom';
import { default as contract } from 'truffle-contract';

import canvas_artifacts from '../../../build/contracts/CanvasCore.json';


class MainApplication extends React.Component {
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

    this.CanvasCore = contract(canvas_artifacts);
    this.handleContract = this.handleContract.bind(this)
    this.buyPixels = this.buyPixels.bind(this)
    this.createPixelArray = this.createPixelArray.bind(this)
    this.changeSelectedTab = this.changeSelectedTab.bind(this)
    this.pixelAddingSelection = this.pixelAddingSelection.bind(this)
    this.adjustScale = this.adjustScale.bind(this)
    this.adjustCameraPosition = this.adjustCameraPosition.bind(this)
    this.updateCommentLink = this.updateCommentLink.bind(this)
    this.setColoringColor = this.setColoringColor.bind(this)


    this.sideHeight = 720;
    this.sideLength = 1280;


  }

  createPixelArray(orderedPixels) {
    let result = [];
    // console.log('hey')
    // console.log(this.state.pixels);
    console.log(orderedPixels);
    for (var i = 0; i < this.sideHeight; i++) {
      for (var j = 0; j < this.sideLength; j++) {
        const currentPixel = this.state.pixels[(i*this.sideLength) + j];
        let r;
        let g;
        let b;
        let a;
        if (currentPixel) {
          r = currentPixel.red;
          g = currentPixel.blue;
          b = currentPixel.green;
          a = 255;
        } else {
          r = Math.floor(Math.random() * 255);
          g = Math.floor(Math.random() * 255);
          b = Math.floor(Math.random() * 255);
          a = Math.floor(Math.random() * 255);
        }
        let color = [r, g, b, a];
        // var x = this.convertColorToUint32(color)
        // var y = this.convertUint32ToColorArray(x)
        // result.push([i, j, y]);
        result.push([i, j, color]);
      }
    }
    this.setState({'pixelArray': result})
  }

  componentWillMount(){
    this.handleContract();
  }

  componentDidMount() {
    // window.setTimeout(this.createPixelArray, 1500)
    window.setTimeout(this.handleContract, 1500)
  }

  handleContract(){
    const self = this;
    if (this.state.instance !== null) {
      this.props.requestPixels(this.state.instance, this.props.accounts[0])
    } else if (this.props.web3 !== null) {
      this.CanvasCore.setProvider(this.props.web3.currentProvider);
      this.CanvasCore.deployed().then((instance) => {
        this.setState(instance: instance)
        this.props.requestPixels(instance, this.props.accounts[0]).then(function(result){
          self.setState({ 'pixels': result.pixels });
        })
      })
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.pixels && newProps.pixels.ids && this.state.pixels !== newProps.pixels) {

      let orderedPixels = {};
      // console.log(newProps.pixels);

      // REPLACE WITH NEW PROPS FROM CONTRACT
      for (var i = 0; i < newProps.pixels.ids.length; i++) {
        orderedPixels[i] = {};
        orderedPixels[i].color = newProps.pixels.colors[i];
        orderedPixels[i].price = newProps.pixels.prices[i];
        orderedPixels[i].rentable = newProps.pixels.rentable[i];
        orderedPixels[i].buyable = newProps.pixels.buyable[i];
        orderedPixels[i].squatable = newProps.pixels.squatable[i];
      }
      console.log(orderedPixels);

      // this.setState({pixels: newProps.pixels});
      this.setState({pixels: orderedPixels});
      this.createPixelArray(orderedPixels);
    } else if (newProps.web3 !== undefined) {
      this.setState( {web3: newProps.web3})
      this.handleContract()
    }
  }

  // convertColorToUint32(colorArray) {
    // var red = 255;
    // var green = 0;
    // var blue = 0;
    // var alpha = 1;
    // var rgba = (red << 24) + (green << 16) + (blue << 8) + (alpha);
    // console.log(rgba);
    // return (colorArray[0] << 24) + (colorArray[1] << 16) + (colorArray[2] << 8) + colorArray[3];
  // }

  // convertUint32ToColorArray(uint32) {
    // var pixelValue = rgba;
    // var pixelData = {
    //   red: pixelValue >> 24 & 0xFF,
    //   green: pixelValue >> 16 & 0xFF,
    //   blue: pixelValue >> 8 & 0xFF,
    //   alpha: pixelValue & 0xFF
    // };
    // console.log(pixelData);
    // return [
    //   uint32 >> 24 & 0xFF,
    //   uint32 >> 16 & 0xFF,
    //   uint32 >> 8 & 0xFF,
    //   uint32 & 0xFF
    // ];
  // }

  // Takes an array of arrays/strings/numbers
  buyPixels(pixels) {
    // var j = this.convertColorToUint32([255,0,0,1])
    // console.log(this.convertColorToUint32([255,0,0,1]));
    // console.log(this.convertUint32ToColorArray(j));

    this.CanvasCore.deployed().then(instance => {
      const pixelIdsArray = [];
      const colorsArray = [];
      for (var i = 0; i < 10; i++) {
        pixelIdsArray.push(i);
        colorsArray.push(-5952982);
      }
      const cooldown = 1;
      const rentable = true;
      const priceEther = 0.42;
      const totalCost = 1;

      const pixelsTesting = [ pixelIdsArray, colorsArray, priceEther, cooldown, rentable, totalCost ];
      return this.props.buyPixels(instance, this.props.accounts[0], pixelsTesting);
    }).then(transactionId => {
      console.log('buyPixels transaction posted (may take time to verify transaction)');
    });
  }


  changeSelectedTab(tab) {
    this.setState({'currentTab': tab})
  }

  pixelAddingSelection(pixel) {
    switch(this.state.currentTab) {
      case 'draw':
        this.props.addPixelDraw(pixel);
        break;
      case 'buy':
        this.props.addPixelBuy(pixel);
        break;
      case 'rent':
        this.props.addPixelRent(pixel);
        break;
      case 'manage':
        // this.props.addPixelManage(pixel);
        break;
      default:
      return null;
    }
  }

  adjustScale(multiplier) {
    this.setState({'scale': this.state.scale * multiplier});
  }

  adjustCameraPosition(relativeTo, movementSpeed) {
    let position = this.state.position;
    if (relativeTo === 'left') {
      position[0] += movementSpeed
      this.setState({'position': position})
    } else if (relativeTo === 'top') {
      position[1] += movementSpeed
      this.setState({'position': position})
    }
  }

  updateCommentLink(e) {
    if (e.target.className === 'comment') {
      this.setState({'commentLink':[e.target.value, this.state.commentLink[1]]});
    } else if (e.target.className === 'link') {
      this.setState({'commentLink':[this.state.commentLink[0], e.target.value]});
    }
  }

  setColoringColor(color) {
    this.setState({'coloringColor': color})
  }

  render() {
    return (
      <div className="canvas-container">
        <NavBar/>
        <ZoomController
          key={`index-${Math.floor(Math.random() * 1000)}`}
          pixels={this.state.pixels}
          pixelArray={this.state.pixelArray}
          addSelectedPixels={this.pixelAddingSelection}
          scale={this.state.scale}
          position={this.state.position}
          adjustCameraPosition={this.adjustCameraPosition}
          adjustScale={this.adjustScale}/>
        <PanelContainer
          currentTab={this.state.currentTab}
          changeSelectedTab={this.changeSelectedTab}
          selectedPixels={this.props.selectedPixels}
          commentLink={this.state.commentLink}
          updateCommentLink={this.updateCommentLink}
          buyPixels={this.buyPixels}
        />
        <ColorPicker setColoringColor={this.setColoringColor}/>
      </div>
    )
  }
}

export default MainApplication;

/* eslint no-mixed-operators: 0 */

import React from 'react';
// import ReactDOM from 'react-dom';
import ZoomController from './board/zoom_controller';
import NavBar from './other/nav_bar';
import PanelContainer from './panel/panel_container';
import ColorPicker from './other/color_picker';
import $ from "jquery";

// import { Link } from 'react-router-dom';
import { default as contract } from 'truffle-contract';

import canvas_artifacts from '../../../build/contracts/CanvasCore.json';


class MainApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: {},
      instance: null,
      scale: 5.43,
      position: [47,50],
      pixelArray: [],
      currentTab: 'buy',
      commentLink: ['',''],
      coloringColor: [255, 0, 0, 255],
      transactionCosts: {'buy': 0}

    };

    this.CanvasCore = contract(canvas_artifacts);
    this.handleContract = this.handleContract.bind(this)
    this.buyPixels = this.buyPixels.bind(this)
    this.rentPixels = this.rentPixels.bind(this)
    this.changeSelectedTab = this.changeSelectedTab.bind(this)
    this.addSelectedPixels = this.addSelectedPixels.bind(this)
    this.adjustScale = this.adjustScale.bind(this)
    this.adjustCameraPosition = this.adjustCameraPosition.bind(this)
    this.updateCommentLink = this.updateCommentLink.bind(this)
    this.setColoringColor = this.setColoringColor.bind(this)
    this.convertColorToUint32 = this.convertColorToUint32.bind(this)
    this.estimateBuyTransactionCosts = this.estimateBuyTransactionCosts.bind(this)
    this.createPixelsForBuy = this.createPixelsForBuy.bind(this)

    this.sideHeight = 100;
    this.sideLength = 100;
  }

  convertColorToUint32(colorArray) {
    return (colorArray[0] << 24) + (colorArray[1] << 16) + (colorArray[2] << 8) + colorArray[3];
  }

  convertUint32ToColorArray(uint32) {
    return [
      uint32 >> 24 & 0xFF,
      uint32 >> 16 & 0xFF,
      uint32 >> 8 & 0xFF,
      uint32 & 0xFF
    ];
  }

  componentWillMount(){
    this.handleContract();
  }

  handleContract(){
    const self = this;
    if (this.state.instance !== null) {
      this.props.requestPixels(this.state.instance, this.props.accounts[0])
      window.setTimeout(this.handleContract, 1500)
    } else if (this.props.web3 !== null) {
      this.CanvasCore.setProvider(this.props.web3.currentProvider);
      this.CanvasCore.deployed().then((instance) => {
        this.setState(instance: instance)
        this.props.requestPixels(instance, this.props.accounts[0]).then(function(result){
          self.setState({ 'pixels': result.pixels });
        })
      })
    } else {
      window.setTimeout(this.handleContract, 1500)
    }
  }

  buyPixels() {
    const pixels = this.createPixelsForBuy();

    this.CanvasCore.deployed().then(instance => {
      return this.props.buyPixels(instance, this.props.accounts[0], pixels);
    }).then(transactionId => {
      console.log('buyPixels transaction posted (may take time to verify transaction)');
    });
  }

  createPixelsForBuy() {
    let pixels = this.props.selectedPixels.buy;

    const pixelIdsArray = [];
    const colorsArray = [];

    for (var i = 0; i < Object.keys(pixels).length; i++) {
      pixelIdsArray.push(Number(Object.keys(pixels)[i]));
      let currentPixel = pixels[Object.keys(pixels)[i]];
      colorsArray.push(this.convertColorToUint32(currentPixel));
    }
    const priceEther = $('.new-price').val() ? $('.new-price').val() : 0;
    const rentable = $('#allowRenting').prop('checked');
    const cooldown = $('.dropdown-input').val();

    // THIS IS FAKE DATA FOR NOW
    const totalCost = 1;

    return [ pixelIdsArray, colorsArray, priceEther, cooldown, rentable, totalCost ];
  }

  estimateBuyTransactionCosts(pixels) {
    this.CanvasCore.deployed().then(instance => {
      return instance.buyPixels.estimateGas(pixels[0], pixels[1], window.web3.toWei(pixels[2]), pixels[3], pixels[4], {from: this.props.accounts[0], value: window.web3.toWei(pixels[5], 'ether')});
    }).then(estimate => {
      this.setState({ transactionCosts: {'buy': estimate}})
      // console.log(estimate);
    });

  }

  rentPixels() {
    const pixels = this.props.selectedPixels.rent;

    this.CanvasCore.deployed().then(instance => {

      const pixelIdsArray = [];
      const colorsArray = [];

      for (var i = 0; i < Object.keys(pixels).length; i++) {
        pixelIdsArray.push(Number(Object.keys(pixels)[i]));
        let currentPixel = pixels[Object.keys(pixels)[i]];
        colorsArray.push(this.convertColorToUint32(currentPixel));
      }

      const cooldownWeeks = Number($('.dropdown-weeks option:selected').text());

      // THIS IS FAKE DATA TO TEST RENTING
      // const cooldownWeeks = 1;
      const totalCost = 1;
      // END OF FAKE DATA

      const pixelsTesting = [ pixelIdsArray, colorsArray, cooldownWeeks, totalCost ];
      return this.props.rentPixels(instance, this.props.accounts[0], pixelsTesting);
    }).then(transactionId => {
      console.log('rentPixels transaction posted (may take time to verify transaction)');
    });
  }


  changeSelectedTab(tab) {
    this.setState({'currentTab': tab})
  }

  addSelectedPixels(pixelId) {
    var addPixelSelection = [pixelId].concat(this.state.coloringColor);
    switch(this.state.currentTab) {
      case 'draw':
        this.props.addPixelDraw(addPixelSelection);
        break;
      case 'buy':
        this.props.addPixelBuy(addPixelSelection);
        const pixelBuyArray = this.createPixelsForBuy()
        this.estimateBuyTransactionCosts(pixelBuyArray);
        break;
      case 'rent':
        this.props.addPixelRent(addPixelSelection);
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
    var rgba = color.substring(4, color.length-1)
             .replace(/ /g, '')
             .split(',')
             .map(function(el){return Number(el)});
    rgba.push(255);

    const colorInt = rgba;
    this.setState({'coloringColor': colorInt})
  }

  render() {
    return (
      <div className="canvas-container">
        <NavBar/>
        <ZoomController
          key={`index-${Math.floor(Math.random() * 1000)}`}
          pixels={this.state.pixels}
          addSelectedPixels={this.addSelectedPixels}
          selectedPixels={this.props.selectedPixels}
          scale={this.state.scale}
          position={this.state.position}
          adjustCameraPosition={this.adjustCameraPosition}
          currentTab={this.state.currentTab}
          adjustScale={this.adjustScale}/>
        <PanelContainer
          currentTab={this.state.currentTab}
          changeSelectedTab={this.changeSelectedTab}
          selectedPixels={this.props.selectedPixels}
          commentLink={this.state.commentLink}
          updateCommentLink={this.updateCommentLink}
          buyPixels={this.buyPixels}
          rentPixels={this.rentPixels}
          transactionCosts={this.state.transactionCosts}
        />
        <ColorPicker setColoringColor={this.setColoringColor}/>
      </div>
    )
  }
}

export default MainApplication;

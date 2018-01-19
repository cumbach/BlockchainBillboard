import React from 'react';
// import ReactDOM from 'react-dom';
import ZoomController from './board/zoom_controller';
// import { Link } from 'react-router-dom';
import { default as contract } from 'truffle-contract';

// import fundeth_artifacts from '../../../build/contracts/FundEth.json';
// import metacoin_artifacts from '../../../build/contracts/MetaCoin.json';
import canvas_artifacts from '../../../build/contracts/CanvasCore.json';


class ProjectsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: {},
      instance: null,
      pixelArray: []
    };

    this.CanvasCore = contract(canvas_artifacts);
    this.handleContract = this.handleContract.bind(this)
    this.buyPixels = this.buyPixels.bind(this)
    this.createPixelArray = this.createPixelArray.bind(this)
    this.sideLength = 500;


  }

  createPixelArray() {
    let result = [];
    for (var i = 0; i < this.sideLength; i++) {
      for (var j = 0; j < this.sideLength; j++) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let color = 'rgb(' + r + ',' + g + ',' + b + ')';
        result.push([i, j, color]);
      }
    }
    this.setState({'pixelArray': result})
  }

  componentWillMount(){
    // this.handleContract();
  }

  componentDidMount() {
    window.setTimeout(this.createPixelArray, 1500)
    // window.setTimeout(this.handleContract, 1500)
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
    if (newProps.pixels && this.state.pixels !== newProps.pixels) {
      this.setState({pixels: newProps.pixels});
    } else if (newProps.web3 !== undefined) {
      this.setState( {web3: newProps.web3})
      this.handleContract()
    }
  }

  // Takes an array of arrays/strings/numbers
  buyPixels(pixels) {
    this.CanvasCore.deployed().then(instance => {
      const pixelIdsArray = [6, 9];
      const colorsArray = [12, 249];
      const url = 'link2';
      const comment = 'comment2';
      const priceEther = 0.42;
      const totalCost = 2;

      const pixelsTesting = [ pixelIdsArray, colorsArray, url, comment, priceEther, totalCost ];
      return this.props.buyPixels(instance, this.props.accounts[0], pixelsTesting);
    }).then(transactionId => {
      console.log('buyPixels transaction posted (may take time to verify transaction)');
    });
  }

  render() {
    if (false && typeof this.state.pixels === 'object' && Object.values(this.state.pixels).length !== 0) {
      return(
        <div className="projects-index-container">

          <div className="projects-index-header-container">
            <div className="projects-index-header">
            <div onClick={this.buyPixels}>CLICK TO TEST BUY</div>
              Projects
            </div>
          </div>

          <div className="projects-index-list-container">
            <ul className="projects-index-list">
            </ul>
          </div>

        </div>
      );
    } else {
      return (
        <div className="canvas-container">
          <ZoomController key={`index-${Math.floor(Math.random() * 1000)}`} pixelArray={this.state.pixelArray}/>
        </div>
      )
    }
  }
}

export default ProjectsIndex;

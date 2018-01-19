import React from 'react';
// import ReactDOM from 'react-dom';
import ProjectIndexItem from './project_index_item';
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
      instance: null
    };

    this.handleContract = this.handleContract.bind(this)
  }

  componentWillMount(){
    this.handleContract();
  }

  componentDidMount() {
    window.setTimeout(this.handleContract, 1500)
  }


  handleContract(){
    const self = this;
    if (this.state.instance !== null) {
      this.props.requestPixels(this.state.instance, this.props.accounts[0])
    } else if (this.props.web3 !== null) {
      var FundEth = contract(canvas_artifacts);
      FundEth.setProvider(this.props.web3.currentProvider);
      FundEth.deployed().then((instance) => {
        this.setState(instance: instance)
        this.props.requestPixels(instance, this.props.accounts[0]).then(function(result){
          self.setState({ 'pixels': result.pixels });
        })
      })
    }
  }

  componentWillUpdate() {
  }
  componentDidUpdate() {
  }


  componentWillReceiveProps(newProps) {

    if (newProps.pixels && this.state.pixels !== newProps.pixels) {
      this.setState({pixels: newProps.pixels});
    } else if (newProps.web3 !== undefined) {
      this.setState( {web3: newProps.web3})
      this.handleContract()
    }
  }

  render() {
    if (typeof this.state.pixels === 'object' && Object.values(this.state.pixels).length !== 0) {
      const pixelsArr = Object.keys(this.state.pixels);
      // console.log(this.state.pixels);
      // console.log(pixelsArr);

      return(
        <div className="projects-index-container">

          <div className="projects-index-header-container">
            <div className="projects-index-header">
              Projects
            </div>
          </div>
          {
              pixelsArr.map(property => (
                <ProjectIndexItem key={`index-${Math.floor(Math.random() * 1000)}`} project={property} />
              ))
            }
          <div className="projects-index-list-container">
            <ul className="projects-index-list">
            </ul>
          </div>

        </div>
      );
    } else {
      return null;
    }
  }
}

export default ProjectsIndex;

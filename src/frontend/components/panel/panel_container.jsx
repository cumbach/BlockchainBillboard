import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import TabSelectionContainer from './tab_selection_container';
import DrawContainer from './draw_container';
import BuyContainer from './buy_container';
import RentContainer from './rent_container';
import ManageContainer from './manage_container';

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'draw',
    };

    this.currentDisplayedTab = this.currentDisplayedTab.bind(this)
    this.changeSelectedTab = this.changeSelectedTab.bind(this)
    // this.animate = this.animate.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    // this.getPositions = this.getPositions.bind(this)
    // this.comparePositions = this.comparePositions.bind(this)
    this.sideLength = 500;
  }

  changeSelectedTab(tab) {
    console.log(tab);
    this.setState({'currentTab': tab});
  }

  currentDisplayedTab() {
    return (
      <div className='current-displayed-action'>
        {(() => {
          switch(this.state.currentTab) {
            case 'draw':
              return <DrawContainer
                        selectedPixels={this.props.selectedPixels.draw}/>;
            case 'buy':
              return <BuyContainer
                        selectedPixels={this.props.selectedPixels.buy}/>;
            case 'rent':
              return <RentContainer
                        selectedPixels={this.props.selectedPixels.rent}/>;
            case 'manage':
              return <ManageContainer
                        selectedPixels={this.props.selectedPixels.manage}/>;
            default:
            return null;
          }
        })()}
      </div>
    );
  }


  render() {
    return (
      <div className='panel-container'>
        <TabSelectionContainer changeSelectedTab={this.changeSelectedTab}/>
        {this.currentDisplayedTab()}
      </div>
    );
  }
}

export default PanelContainer;

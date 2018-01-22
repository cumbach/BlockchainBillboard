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
    };

    this.currentDisplayedTab = this.currentDisplayedTab.bind(this)
  }

  currentDisplayedTab() {
    return (
      <div className='current-displayed-action'>
        {(() => {
          switch(this.props.currentTab) {
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
        <TabSelectionContainer changeSelectedTab={this.props.changeSelectedTab}/>
        {this.currentDisplayedTab()}
      </div>
    );
  }
}

export default PanelContainer;

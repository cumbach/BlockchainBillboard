import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';


class TabSelectionContainer extends React.Component {
  render() {
    return (
      <div className={'tab-selection-container ' + this.props.currentTab}>
        <div className='action-tab draw-tab' onClick={this.props.changeSelectedTab.bind(this, 'draw')}>Draw</div>
        <div className='action-tab buy-tab' onClick={this.props.changeSelectedTab.bind(this, 'buy')}>Buy</div>
        <div className='action-tab rent-tab' onClick={this.props.changeSelectedTab.bind(this, 'rent')}>Rent</div>
        <div className='action-tab manage-tab' onClick={this.props.changeSelectedTab.bind(this, 'manage')}>Manage</div>
      </div>
    );
  }
}

export default TabSelectionContainer;

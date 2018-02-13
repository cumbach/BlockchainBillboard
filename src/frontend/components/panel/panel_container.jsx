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
                        selectedPixels={this.props.selectedPixels.draw}
                        updateCommentLink={this.props.updateCommentLink}
                        commentLink={this.props.commentLink}
                        removeSelectedPixel={this.props.removeSelectedPixel}/>;
            case 'buy':
              return <BuyContainer
                        selectedPixels={this.props.selectedPixels.buy}
                        updateCommentLink={this.props.updateCommentLink}
                        commentLink={this.props.commentLink}
                        transactionCosts={this.props.transactionCosts}
                        buyPixels={this.props.buyPixels}
                        removeSelectedPixel={this.props.removeSelectedPixel}/>;
            case 'rent':
              return <RentContainer
                        selectedPixels={this.props.selectedPixels.rent}
                        updateCommentLink={this.props.updateCommentLink}
                        commentLink={this.props.commentLink}
                        rentPixels={this.props.rentPixels}
                        removeSelectedPixel={this.props.removeSelectedPixel}/>;
            case 'manage':
              return <ManageContainer
                        selectedPixels={this.props.selectedPixels.manage}
                        updateCommentLink={this.props.updateCommentLink}
                        commentLink={this.props.commentLink}
                        removeSelectedPixel={this.props.removeSelectedPixel}/>;
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
        <TabSelectionContainer currentTab={this.props.currentTab} changeSelectedTab={this.props.changeSelectedTab}/>
        {this.currentDisplayedTab()}
      </div>
    );
  }
}

export default PanelContainer;

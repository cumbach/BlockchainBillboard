import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import SelectedPixels from './panel_components/selected_pixels';
import CommentLinkField from './panel_components/comment_link_field';
import TabulatedCosts from './panel_components/tabulated_costs';
import ActionButton from './panel_components/action_button';
import CooldownDropdown from './panel_components/cooldown_dropdown';
import RentableToggle from './panel_components/rentable_toggle';
import SetNewPrice from './panel_components/set_new_price';

class BuyContainer extends React.Component {
  render() {
    return (
      <div className='action-container buy-container'>
        BUY
        <SelectedPixels removeSelectedPixel={this.props.removeSelectedPixel} selectedPixels={this.props.selectedPixels}/>
        <CommentLinkField commentLink={this.props.commentLink} updateCommentLink={this.props.updateCommentLink}/>
        <SetNewPrice/>
        <CooldownDropdown currentTab='Buy'/>
        <RentableToggle/>
        <TabulatedCosts transactionCosts={this.props.transactionCosts}/>
        <ActionButton actionName='Buy' doAction={this.props.buyPixels}/>
      </div>
    );
  }
}

export default BuyContainer;

import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import SelectedPixels from './panel_components/selected_pixels';
import CommentLinkField from './panel_components/comment_link_field';
import CooldownDropdown from './panel_components/cooldown_dropdown';
import TabulatedCosts from './panel_components/tabulated_costs';
import ActionButton from './panel_components/action_button';

class RentContainer extends React.Component {
  render() {
    return (
      <div className='action-container rent-container'>
        RENT
        <SelectedPixels removeSelectedPixel={this.props.removeSelectedPixel} selectedPixels={this.props.selectedPixels}/>
        <CommentLinkField commentLink={this.props.commentLink} updateCommentLink={this.props.updateCommentLink}/>
        <CooldownDropdown currentTab='Rent'/>
        <TabulatedCosts/>
        <ActionButton actionName='Rent' doAction={this.props.rentPixels}/>
      </div>
    );
  }
}

export default RentContainer;

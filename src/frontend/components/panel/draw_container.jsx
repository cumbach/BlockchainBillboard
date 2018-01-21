import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import SelectedPixels from './panel_components/selected_pixels';
import CommentLinkField from './panel_components/comment_link_field';
import TabulatedCosts from './panel_components/tabulated_costs';
import ActionButton from './panel_components/action_button';


class DrawContainer extends React.Component {
  render() {
    return (
      <div className='action-container draw-container'>
        <SelectedPixels selectedPixels={this.props.selectedPixels}/>
        <CommentLinkField/>
        <TabulatedCosts/>
        <ActionButton/>
      </div>
    );
  }
}

export default DrawContainer;

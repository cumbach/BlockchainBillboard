import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class ActionButton extends React.Component {
  render() {
    return (
      <div className='action-button' onClick={this.props.doAction}>
        {this.props.actionName}
      </div>
    );
  }
}

export default ActionButton;

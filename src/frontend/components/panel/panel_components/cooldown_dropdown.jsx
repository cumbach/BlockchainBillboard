import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class CooldownDropdown extends React.Component {
  constructor(props){
    super(props);
    this.displayCooldown = this.displayCooldown.bind(this);
  }

  displayCooldown() {
    if (this.props.currentTab === 'Buy') {
      return (
        <div>
        <input className='dropdown-input'></input>
        <select defaultValue='weeks'>
          <option value='weeks'>Weeks</option>
          <option value='months'>Months</option>
        </select>
        </div>
      );
    } else if (this.props.currentTab === 'Rent') {
      return (
        <div>
          <select defaultValue='one-week'>
            <option value='one-week'>1</option>
            <option value='two-weeks'>2</option>
            <option value='three-weeks'>3</option>
          </select>
          <select defaultValue='weeks'>
            <option value='weeks'>Weeks</option>
          </select>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='cooldown-dropdown'>
        <strong>Cooldown Time</strong>
        {this.displayCooldown()}
      </div>
    );
  }
}

export default CooldownDropdown;

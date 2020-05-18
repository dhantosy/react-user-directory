import React, { Component } from 'react';
import HeaderActions from './HeaderActions';

class Header extends Component {
 
  render() {

    return (
      <header>
        <h1>User Directory</h1>
        <div>
          <h5>Filter By:</h5>
          <HeaderActions 
            filterColorState={this.props.filterColorState}
            filterCitiesState={this.props.filterCitiesState} 
          />
        </div>
      </header>
    )
  }
}

export default Header

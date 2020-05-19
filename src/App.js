import React, { Component } from 'react';
import Wrapper from './components/Wrapper/Wrapper';
import Header from './components/Header/Header';
import UserCard from './components/UserCard/UserCard';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isColorSelected: null,
      isCitiesSelected: null
    }
  }

  handleColorStateChange = (props) => {
    this.setState({ isColorSelected: props });
  }

  handleCitiesStateChange = (props) => {
    this.setState({ isCitiesSelected: props });
  }

  render() {
    return (
      <Wrapper>
        <Header 
          filterColorState={this.handleColorStateChange} 
          filterCitiesState={this.handleCitiesStateChange} 
        />
        <UserCard
          isColorSelected={this.state.isColorSelected}
          isCitiesSelected={this.state.isCitiesSelected}
        />
      </Wrapper>
    )
  }
}

export default App;

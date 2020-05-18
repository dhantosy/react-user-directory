import React, { Component } from 'react';
import StylesHeader from './Header.module.scss';

class HeaderActions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      btnColorState: false,
      btnCitiesState: false,
    }
  }

  componentDidMount = () => {
    let getColorStateFromStorage = localStorage.getItem('colorState');
    let getCitiesStateFromStorage = localStorage.getItem('cityState');
    let isColorStateTrue = (getColorStateFromStorage === 'true');
    let isCitiesStateTrue = (getCitiesStateFromStorage === 'true');

    if (getColorStateFromStorage !== null) {
      this.setState({
        btnColorState: isColorStateTrue,
        btnCitiesState: isCitiesStateTrue
      }, function () {
          this.props.filterColorState(this.state.btnColorState);
          this.props.filterCitiesState(this.state.btnCitiesState);
        }
      );
    }
  }

  handleBtnColorClick = () => {
    this.setState({
      btnColorState: this.state.btnColorState ? !this.state.btnColorState : !this.state.btnColorState,
      btnCitiesState: this.state.btnCitiesState ? !this.state.btnCitiesState : this.state.btnCitiesState
    }, function () {
        this.props.filterColorState(this.state.btnColorState);
        this.props.filterCitiesState(this.state.btnCitiesState);
        localStorage.setItem('colorState', this.state.btnColorState);
        localStorage.setItem('cityState', this.state.btnCitiesState);
      }
    );
  }

  handleBtnCitiesClick = () => {
    this.setState({
      btnColorState: this.state.btnColorState ? !this.state.btnColorState : this.state.btnColorState,
      btnCitiesState: this.state.btnCitiesState ? !this.state.btnCitiesState : !this.state.btnCitiesState
    }, function () {
        this.props.filterColorState(this.state.btnColorState);
        this.props.filterCitiesState(this.state.btnCitiesState);
        localStorage.setItem('colorState', this.state.btnColorState);
        localStorage.setItem('cityState', this.state.btnCitiesState);
      }
    );
  }

  render() {
    let btnColorClassName = this.state.btnColorState ? `${StylesHeader.navigation__item} ${StylesHeader.navigation__item_active}` : `${StylesHeader.navigation__item}`;
    let btnCitiesClassName = this.state.btnCitiesState ? `${StylesHeader.navigation__item} ${StylesHeader.navigation__item_active}` : `${StylesHeader.navigation__item}`;

    return (
      <div className={`${StylesHeader.navigation__container}`}>
        <div
          className={btnColorClassName}
          onClick={this.handleBtnColorClick}
        >
          <span>Color</span>
        </div>
        <div
          className={btnCitiesClassName}
          onClick={this.handleBtnCitiesClick}
        >
          <span>Cities</span>
        </div>
      </div>
    )
  }
}

export default HeaderActions

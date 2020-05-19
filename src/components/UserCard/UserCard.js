import React, { Component } from 'react';
import axios from 'axios';
import { splitArray } from '../../utils/splitArray';
import { filterDataByColor } from '../../utils/filterDataByColor';
import { filterDataByCity } from '../../utils/filterDataByCity';

import UserCardItem from './UserCardItem';
import StylesUserCard from './UserCard.module.scss';

class UserCard extends Component {

  constructor(props) {
    super(props);
    this.cardContainerRef = React.createRef();

    this.state = {
      originalData: [],
      chunkedData: [],
      newChunkedData: [],
      sortedDataByColor: [],
      sortedDataByCity: [],
      isLoading: true,
      errorMessage: null,
      scrolledCount: 0,
      scrolledCountMax: 9,
      windowWidth: window.innerWidth, 
      windowHeight: window.innerHeight,
      getMoreUsers: false
    }
  }

  componentDidMount = () => {
    const apiURL = 'https://randomuser.me/api/?results=100';
    window.addEventListener('resize', this.updateDimensions.bind(this));

    axios.get(apiURL)
      .then(response => {
        this.setState({
          originalData: response.data.results,
          chunkedData: splitArray(response.data.results, 10),
          isLoading: false,
        }, function() {
            this.setState({
              sortedDataByColor: filterDataByColor(this.state.chunkedData[0]),
              sortedDataByCity: filterDataByCity(this.state.chunkedData[0]),
              newChunkedData: this.state.chunkedData[0]
            });
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: error,
          isLoading: false
        })
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({ 
      windowWidth: window.innerWidth
    });
  }

  handleScroll = (props) => {
    const node = this.cardContainerRef;
    let windowWidth = this.state.windowWidth;
    let scrollLeft = node.current.scrollLeft;
    let scrollTop = node.current.scrollTop;
    let scrollWidth = node.current.scrollWidth;
    let scrollHeight = node.current.scrollHeight;
    let clientHeight = node.current.clientHeight;

    if (windowWidth > 640) {
      if ((scrollWidth - scrollLeft) === windowWidth) {
        this.setState({
          getMoreUsers: true
        }, function () {
          if (this.state.scrolledCount < this.state.scrolledCountMax) {
            setTimeout(function () {
              this.setState({
                scrolledCount: props + 1,
                getMoreUsers: false
              }, function () {
                let updatedData = [...this.state.newChunkedData].concat(this.state.chunkedData[this.state.scrolledCount]);

                this.setState({
                  newChunkedData: updatedData,
                  sortedDataByColor: filterDataByColor(updatedData),
                  sortedDataByCity: filterDataByCity(updatedData)
                })
              })
            }.bind(this), 500)
          }
        })
      }
    } else {
      if ((scrollHeight - scrollTop) === clientHeight) {
        this.setState({
          getMoreUsers: true
        }, function () {
          if (this.state.scrolledCount < this.state.scrolledCountMax) {
            setTimeout(function () {
              this.setState({
                scrolledCount: props + 1,
                getMoreUsers: false
              }, function () {
                let updatedData = [...this.state.newChunkedData].concat(this.state.chunkedData[this.state.scrolledCount]);

                this.setState({
                  newChunkedData: updatedData,
                  sortedDataByColor: filterDataByColor(updatedData),
                  sortedDataByCity: filterDataByCity(updatedData)
                })
              })
            }.bind(this), 500)
          }
        })
      }
    }
  }

  renderContent() {
    let isColorSelected = this.props.isColorSelected;
    let isCitiesSelected = this.props.isCitiesSelected;
    let dataSource;

    if (isColorSelected === false) {
      dataSource = this.state.newChunkedData;

      if (isCitiesSelected) {
        dataSource = this.state.sortedDataByCity;
      }
    } else if (isColorSelected === true) {
      dataSource = this.state.sortedDataByColor;

      if (isCitiesSelected === true) {
        dataSource = this.state.sortedDataByCity;
      }
    } else {
      dataSource = this.state.newChunkedData;
    }

    return (
      <>
        {
          this.state.isLoading
            ? [...new Array(5)].map((user, key) => {
                return (
                  <UserCardItem
                    key={key}
                  />
                )
              })
            : dataSource.map((user, key) => {
              return (
                <UserCardItem
                  key={key}
                  userData={user}
                />
              )
            })
        }
      </>
    )
  }

  render() {
    let mobileHeight;

    if (this.state.windowWidth < 641) {
      mobileHeight = this.state.windowHeight - 120;
    }

    return (
      <section 
        ref={this.cardContainerRef} 
        className={`${StylesUserCard.container}`} 
        onScroll={() => this.handleScroll(this.state.scrolledCount)}
        style={{
          height: mobileHeight
        }}
      >
        {this.renderContent()}
        {
          this.state.getMoreUsers && this.state.scrolledCount < 9
            ? <div className={`${StylesUserCard.notice}`} >Loading more data..</div>
            : null
        }
      </section>
    )
  }

}

export default UserCard

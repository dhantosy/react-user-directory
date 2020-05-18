import React, { Component } from 'react';
import StylesUserCard from './UserCard.module.scss';
import LoadingSkeleton from './../LoadingSkeleton/LoadingSkeleton';
import axios from 'axios';

class UserCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      originalData: [],
      sortedDataByColor: [],
      sortedDataByCity: [],
      isDataFetched: false,
      isLoading: true,
      errorMessage: undefined
    }
  }

  componentDidMount = () => {
    const apiURL = 'https://randomuser.me/api/?results=100';

    axios.get(apiURL)
      .then(response => {
        this.setState({
          originalData: response.data.results,
          isDataFetched: true,
          isLoading: false
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: error,
          isDataFetched: false,
          isLoading: false
        })
      });
  }

  componentDidUpdate = (prevProps, prevState) => {
    let originalData = this.state.originalData;

    if (prevProps.isColorSelected !== undefined && !prevState.isDataFetched) {
      let sortData = [];

      let getAgeGreen = originalData.filter(function (el) {
        return el.dob.age > 20 && el.dob.age < 57
      });

      let getAgeBlue = originalData.filter(function (el) {
        return el.dob.age > 56
      });

      let getAgeRed = originalData.filter(function (el) {
        return el.dob.age < 21
      });

      this.setState({
        sortedDataByColor: sortData.concat(getAgeGreen, getAgeBlue, getAgeRed)
      })
    }

    if (prevProps.isCitiesSelected !== undefined && !prevState.isDataFetched) {

      let sortData = [...originalData].sort((a, b) => (a.location.city > b.location.city) ? 1 : (a.location.city === b.location.city) ? ((a.location.state > b.location.state) ? 1 : -1) : -1);

      this.setState({
        sortedDataByCity: sortData
      });
    }

  }

  renderContent() {
    let isColorSelected = this.props.isColorSelected;
    let isCitiesSelected = this.props.isCitiesSelected;
    let dataSource;

    if (isColorSelected === false) {
      dataSource = this.state.originalData;

      if (isCitiesSelected) {
        dataSource = this.state.sortedDataByCity;
      }
    } else if (isColorSelected === true) {
      dataSource = this.state.sortedDataByColor;

      if (isCitiesSelected === true) {
        dataSource = this.state.sortedDataByCity;
      }
    } else {
      dataSource = this.state.originalData;
    }

    if (this.state.isLoading) {
      return (
        [...new Array(3)].map((data, index) => {
          return (
            <div className={`${StylesUserCard.card__container}`} key={index}>
              <div className={`${StylesUserCard.card__item}`}>
                <figure>
                  <LoadingSkeleton />
                </figure>
                <div className={`${StylesUserCard.card__desc}`}>
                  <h6>
                    <div><LoadingSkeleton /></div>
                    <div><LoadingSkeleton /></div>
                  </h6>
                  <address>
                    <div><LoadingSkeleton /></div>
                  </address>
                  <div className={`${StylesUserCard.card__email}`}>
                    <LoadingSkeleton />
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )
    } else {
      return (
        <>
          {
            this.state.originalData.length
              ? dataSource.slice(0, 10).map((user, key) => {
                let bgColor;

                if (user.dob.age < 21) {
                  bgColor = `${StylesUserCard.bg__red}`;
                } else if (user.dob.age > 20 && user.dob.age < 57) {
                  bgColor = `${StylesUserCard.bg__green}`;
                } else {
                  bgColor = `${StylesUserCard.bg__blue}`;
                }

                return (
                  <div className={`${StylesUserCard.card__container}`} key={key}>
                    <div className={`${StylesUserCard.card__item} ${bgColor}`}>
                      <figure>
                        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
                      </figure>
                      <div className={`${StylesUserCard.card__desc}`}>
                        <h6>
                          <div>{`${user.name.title}. ${user.name.first} ${user.name.last}`}</div>
                          <div>{user.dob.age}</div>
                        </h6>
                        <address>
                          <div>
                            {`${user.location.city}, ${user.location.state}, ${user.location.postcode}`}
                          </div>
                        </address>
                        <div className={`${StylesUserCard.card__email}`}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
              : null
          }
        </>
      )
    }
  }

  render() {
    return (
      <section className={`${StylesUserCard.container}`}>
        {this.renderContent()}
      </section>
    )
  }

}

export default UserCard

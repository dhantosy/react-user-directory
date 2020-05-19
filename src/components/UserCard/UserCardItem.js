import React from 'react';

import LoadingSkeleton from './../LoadingSkeleton/LoadingSkeleton';
import StylesUserCard from './UserCard.module.scss';

const UserCardList = (props) => {
  let bgColor;

  if (!props.userData) {
    return (
      <div className={`${StylesUserCard.card__container}`}>
        <div className={`${StylesUserCard.card__item}`}>
          <figure><LoadingSkeleton /></figure>
          <div className={`${StylesUserCard.card__desc}`}>
            <h6>
              <div><LoadingSkeleton /></div>
              <div><LoadingSkeleton /></div>
            </h6>
            <address><LoadingSkeleton /></address>
            <div className={`${StylesUserCard.card__email}`}><LoadingSkeleton /></div>
          </div>
        </div>
      </div>
    )
  }

  if (props.userData.dob.age < 21) {
    bgColor = `${StylesUserCard.bg__red}`;
  } else if (props.userData.dob.age > 20 && props.userData.dob.age < 57) {
    bgColor = `${StylesUserCard.bg__green}`;
  } else {
    bgColor = `${StylesUserCard.bg__blue}`;
  }

  return (
    <div className={`${StylesUserCard.card__container}`}>
      <div className={`${StylesUserCard.card__item} ${bgColor}`}>
        <figure>
            <img src={props.userData.picture.large} alt={`${props.userData.name.first} ${props.userData.name.last}`} />
        </figure>
        <div className={`${StylesUserCard.card__desc}`}>
          <h6>
            <div>{`${props.userData.name.title}. ${props.userData.name.first} ${props.userData.name.last}`}</div>
            <div>{props.userData.dob.age}</div>
          </h6>
          <address>
            <div>
              {`${props.userData.location.city}, ${props.userData.location.state}, ${props.userData.location.postcode}`}
            </div>
          </address>
          <div className={`${StylesUserCard.card__email}`}>
            {props.userData.email}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCardList

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import HeaderActions from './components/Header/HeaderActions';
import UserCard from './components/UserCard/UserCard';

describe('App', () => {
  const app = shallow(<App />);
  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('initializes the `state` with null selected color filter', () => {
    expect(app.state().isColorSelected).toEqual(null)
  });

  it('initializes the `state` with null selected city filter', () => {
    expect(app.state().isCitiesSelected).toEqual(null)
  });
});


describe('HeaderActions', () => {
  const initialHeaderActionsProps = {
    filterColorState: jest.fn(),
    filterCitiesState: jest.fn()
  }

  const headerActions = shallow(<HeaderActions {...initialHeaderActionsProps} />);

  it('adds boolean to selected color filter `state` when clicked', () => {
    headerActions.find('#btnFilterColor').simulate('click');

    expect(headerActions.state().btnColorState).toEqual(true || false);
  });

  it('adds boolean to selected city filter `state` when clicked', () => {
    headerActions.find('#btnFilterCity').simulate('click');

    expect(headerActions.state().btnCitiesState).toEqual(true || false);
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import { Search } from './';
import { shallow, mount } from 'enzyme';

const routes = [
  {destination:"gatwick airport", startingPoint:"London Victoria"},
  {destination:"gatwick airport", startingPoint:"London Victoria"},
  {destination:"gatwick airport", startingPoint:"London Waterloo"}
];

const mockCrsCodes = [
  {
    "stationName": "Church & Oswaldtwistle",
    "crsCode": "CTW"
  },
  {
    "stationName": "Lazonby & Kirkoswald",
    "crsCode": "LZB"
  }
];

const mockProps = {
  fetchCrsCode: jest.fn(),
  fetchRoutes: jest.fn(),
  items: routes,
  crsCode: mockCrsCodes
}

window.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn()
}

window.localStorage.getItem.mockReturnValue(JSON.stringify(routes));
window.localStorage.setItem.mockReturnValue(true);

describe('Component: Search', () => {

  it('should match its empty snapshot', () => {

    const component = shallow(<Search {...mockProps} />);

    expect(component).toMatchSnapshot();
  });

  it('should add an item based on the value in the state', () => {
  	const component = shallow(<Search {...mockProps} />);
    const mockEvent = {
      preventDefault: jest.fn(),
    };
    component.setState({
      items: routes
    });
    component.find('form').simulate('submit', mockEvent);
  	expect(component).toMatchSnapshot();
    expect(mockEvent.preventDefault).toBeCalled();
    expect(window.localStorage.getItem.calls).toMatchSnapshot();
    expect(window.localStorage.setItem.calls).toMatchSnapshot();
  });

  it('should pass a selected value to the onChange function', () => {
    const component = shallow(<Search {...mockProps} />);
    const mockEvent1 = {
      target: {
        value: 'London Victoria'
      }
    };
    const mockEvent2 = {
      target: {
        value: 'Gatwick Airport'
      }
    };
    component.setState({
      startingPoint: '',
      destination: ''
    })
    component.find('input').at(0).simulate('change', mockEvent1);
    component.find('input').at(1).simulate('change', mockEvent2);

    expect(component).toMatchSnapshot();
  });
});

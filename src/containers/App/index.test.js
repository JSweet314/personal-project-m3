import React from 'react';
import App from './index';
import {shallow} from 'enzyme';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  
  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
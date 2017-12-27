import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './index.js';

it('should renders without crashing', () => {
  const app = shallow(<App />);
});

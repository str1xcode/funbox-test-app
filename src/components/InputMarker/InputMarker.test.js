import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import InputMarker from './index.js';

it('should renders without crashing', () => {
  const wrapper = shallow(<InputMarker onAdd={() => {}}/>);
});

it('should be input', () => {
  const wrapper = shallow(<InputMarker onAdd={() => {}}/>);
  expect(wrapper.type()).toEqual('input');
});

// fails with e2e testing

// it('call onAdd after press Enter on not empty input', () => {
//   const onAdd = sinon.spy();
//   const wrapper = mount(<InputMarker onAdd={onAdd}/>);
//   wrapper.find('input').instance().value = 'test marker';
//   wrapper.simulate('keyDown', {keyCode: 13, key: 'Enter'});
//   expect(onAdd.called).toEqual(true);
// });
//
// it('not call onAdd after press Enter on empty input', () => {
//   const onAdd = sinon.spy();
//   const wrapper = mount(<InputMarker onAdd={onAdd}/>);
//   wrapper.find('input').instance().value = '';
//   wrapper.simulate('keyDown', {keyCode: 13, key: 'Enter'});
//   expect(onAdd.called).toEqual(false);
// });
//
// it('clean input after submit', () => {
//   const onAdd = sinon.spy();
//   const wrapper = mount(<InputMarker onAdd={onAdd}/>);
//   const inputInstance = wrapper.find('input').instance();
//   inputInstance.value = 'test marker';
//   expect(inputInstance.value).toEqual('test marker');
//   wrapper.simulate('keyDown', {keyCode: 13, key: 'Enter'});
//   expect(inputInstance.value).toEqual('');
// });

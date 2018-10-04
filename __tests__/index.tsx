import * as React from 'react';
import {mount} from 'enzyme';
import {pureContextCompare, updateIgnoring, updateOnlyFor, createPureContext} from '../src';

describe('Specs', () => {

  class Blocker extends React.Component {
    shouldComponentUpdate() {
      return false;
    }

    render() {
      return this.props.children;
    }
  }

  const generateProvider = (Provider: any) => (
    class ContextProvider extends React.Component<any> {
      render() {
        return <Provider value={this.props.value}>{this.props.children}</Provider>
      }
    }
  );

  it('createPureContext', () => {
    const context = createPureContext({a: 1, b: 2});
    const Top = generateProvider(context.Provider);
    const spy = jest.fn();
    const Reactor = () => (
      <context.Consumer>{value => {
        spy(value);
        return null
      }}</context.Consumer>
    );
    const wrapper = mount(<Top value={{a: 1, b: 2}}><Blocker><Reactor/></Blocker></Top>);
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 1, b: 2}});
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 1, b: 3}});
    expect(spy).toHaveBeenCalledWith({a: 1, b: 3});
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('PureContextUpdate', () => {
    const context = React.createContext({a: 1, b: 2}, pureContextCompare);
    const Top = generateProvider(context.Provider);
    const spy = jest.fn();
    const Reactor = () => (
      <context.Consumer>{value => {
        spy(value);
        return null
      }}</context.Consumer>
    );
    const wrapper = mount(<Top value={{a: 1, b: 2}}><Blocker><Reactor/></Blocker></Top>);
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 1, b: 2}});
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 1, b: 3}});
    expect(spy).toHaveBeenCalledWith({a: 1, b: 3});
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('updateIgnoring', () => {
    const context = React.createContext({a: 1, b: 2}, updateIgnoring(['b']));
    const Top = generateProvider(context.Provider);
    const spy = jest.fn();
    const Reactor = () => (
      <context.Consumer>{value => {
        spy(value);
        return null
      }}</context.Consumer>
    );
    const wrapper = mount(<Top value={{a: 1, b: 2}}><Blocker><Reactor/></Blocker></Top>);
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 1, b: 2}});
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 1, b: 3}});
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 2, b: 3}});
    expect(spy).toHaveBeenCalledWith({a: 2, b: 3});
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('updateIgnoring', () => {
    const context = React.createContext({a: 1, b: 2}, updateOnlyFor(['a']));
    const Top = generateProvider(context.Provider);
    const spy = jest.fn();
    const Reactor = () => (
      <context.Consumer>{value => {
        spy(value);
        return null
      }}</context.Consumer>
    );
    const wrapper = mount(<Top value={{a: 1, b: 2}}><Blocker><Reactor/></Blocker></Top>);
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 1, b: 2}});
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 1, b: 3}});
    expect(spy).toHaveBeenCalledWith({a: 1, b: 2});
    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({value: {a: 2, b: 3}});
    expect(spy).toHaveBeenCalledWith({a: 2, b: 3});
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

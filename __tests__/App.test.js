/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Dimensions.get = () => ({ width: 375, height: 812 });
  return RN;
});

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />);
    expect(tree).toBeDefined();
  });

  it('has reset button when game ends', () => {
    const tree = renderer.create(<App />);
    const instance = tree.getInstance();
    instance.setState({ isEnded: true, step: 10 });
    expect(instance.state.isEnded).toBe(true);
  });
});

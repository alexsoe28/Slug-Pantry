import 'react-native';
import React from 'react';
import * as renderer from 'react-test-renderer';

import App from '../App';


test('App snapshot', () => {
  const snap = renderer.create(
    <App/>
  ).toJSON();

  expect(snap).toMatchSnapshot();
});
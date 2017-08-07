import React, { Component } from 'react';
import { Platform } from 'react-native';
import BasicNavigator from './app/BasicNavigator'

import { Provider } from 'react-redux'
import store from './app/config/store';

export default class ExampleApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <BasicNavigator />
      </Provider>
    );
  }
}
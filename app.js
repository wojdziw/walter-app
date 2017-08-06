import React, { Component } from 'react';
import Navigator from './app/Navigator'

import { Provider } from 'react-redux'
import store from './app/config/store';

export default class ExampleApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
import React, { Component } from 'react';
import Tables from './app/screens/Tables'
import Menu from './app/screens/Menu'

import { Provider } from 'react-redux'
import store from './app/config/store';

export default class ExampleApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Menu />
      </Provider>
    );
  }
}
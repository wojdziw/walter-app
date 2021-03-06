import React, { Component } from 'react';
import { Platform } from 'react-native';
import BasicNavigator from './app/BasicNavigator'
import Navigator from './app/Navigator';

import { Provider } from 'react-redux'
import store from './app/config/store';

export default class ExampleApp extends Component {
  render() {
    return (
      <Provider store={store}>
        {Platform.OS == 'web' ? <BasicNavigator /> : <Navigator onNavigationStateChange={null}/>}
      </Provider>
    );
  }
}
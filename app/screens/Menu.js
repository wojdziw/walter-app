import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

export default class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Wojtek jest super!
        </Text>
        <Text style={styles.instructions}>
          Ooo tak, wlasnie tak
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
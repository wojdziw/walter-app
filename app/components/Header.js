import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import colors from '../static/colors'

export default class Header extends Component {
  render() {
    return (<View style={styles.headerContainer} >
        <Image style={{height: 25, width: 160}} source={require('../static/logo.png')}/>
        <Text style={styles.headerSubtitle}>
          powered by eWaiter.pl
        </Text>
      </View>);
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    paddingBottom: 10, 
    backgroundColor: colors.background,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 1.0,
    borderBottomColor: colors.light,
  },
  headerSubtitle: {
    fontFamily: "MarkerFelt-Wide", 
    fontSize: 14,
    color: colors.dark
  }
})

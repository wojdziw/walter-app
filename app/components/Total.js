import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../static/colors'

export default class Total extends Component {
    render() {
        return (
        <View style={styles.overallContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.text}>
              Total:
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={[styles.text, styles.amountText]}>
              {this.props.order.total.toFixed(2)} zł
            </Text>
          </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20, 
    color: colors.dark
  },
  amountText: {
    fontWeight: 'bold'
  },
  totalContainer: {
    flex: 6, 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    paddingLeft: 20
  },
  amountContainer: {
    flex: 4, 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    paddingRight: 20
  },
  overallContainer: {
    backgroundColor: colors.background, 
    height: 50, 
    flexDirection: 'row', 
    borderTopWidth: 1.0, 
    borderTopColor: colors.light
  }
})

import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../static/colors'

export default class Total extends Component {
    render() {
        return (
        <View style={styles.overallContainer}>
          <View style={styles.totalContainer}>
            <Text style={[styles.text, styles.amountText]}>
              {this.props.order.total.toFixed(2)} zł
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}> 
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>
                  {this.props.text}
                </Text>
              </View>
            </TouchableOpacity>
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
  },
  buttonText: {
    fontSize: 15, 
    color: colors.background, 
    fontWeight: 'bold'
  },
  buttonTextContainer: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  button: {
    padding: 5,
    width: 90,
    height: 30, 
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: colors.medium,
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row'
  },
})

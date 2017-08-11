import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import colors from '../static/colors'

export default class Buttons extends Component {
  render() {
    return (
      <View style={styles.buttonsContainer}>
        <NavButton onPress={this.props.onPressPrev} left={true} text={this.props.prevName} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{height: 25, width: 160}} source={require('../static/logo.png')}/>
        </View>
        <NavButton onPress={this.props.onPressNext} left={false} text={this.props.nextName} />
      </View>
    )
  }
}

const NavButton = ({text, onPress, left}) => {
  return (
    <View style={[styles.buttonContainer, {alignItems: left ? 'flex-start' : 'flex-end'}]}>
      <TouchableOpacity style={[styles.button, {justifyContent: left ? 'flex-start' : 'flex-end'}]} onPress={onPress}> 
        <Text style={styles.text}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    paddingTop: Platform.OS=='web' ? 0 : 10,
    height: Platform.OS=='web' ? 50 : 60,
    backgroundColor: colors.medium,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    marginRight: 10,
    marginLeft: 10,
    width: 50,
    height: 30, 
    borderRadius: 4,
    backgroundColor: colors.medium,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: colors.background,
    fontWeight: 'bold'
  }
})


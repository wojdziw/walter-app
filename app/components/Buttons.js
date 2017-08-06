import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../static/colors'

export default class Buttons extends Component {
  render() {
    return (
      <View style={styles.buttonsContainer}>
        <NavButton displayMe={this.props.displayPrev} onPress={this.props.onPressPrev} left={true} leftText={"<"} rightText={this.props.prevName} leftFlex={1} rightFlex={3}/>
        <NavButton displayMe={this.props.displayNext} onPress={this.props.onPressNext} left={false} leftText={this.props.nextName} rightText={">"} leftFlex={3} rightFlex={1}/>
      </View>
    )
  }
}

const NavButton = ({leftText, rightText, leftFlex, rightFlex, displayMe, onPress, left}) => {
  return (
    <View style={[styles.buttonContainer, {alignItems: left ? 'flex-start' : 'flex-end'}]}>
      {displayMe && 
        <TouchableOpacity style={styles.button} onPress={onPress}> 
          <NavButtonRegion flex={leftFlex} text={leftText}/>
          <NavButtonRegion flex={rightFlex} text={rightText}/>
        </TouchableOpacity>
      }
    </View>
  )
}

const NavButtonRegion = ({flex, text}) => {
  return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: flex}}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    height: 60,
    backgroundColor: colors.medium,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    marginRight: 10,
    marginLeft: 10,
    width: 130,
    height: 40, 
    borderRadius: 4,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    color: colors.dark
  }
})


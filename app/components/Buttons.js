import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../static/colors'

export default class Buttons extends Component {
  render() {
    return (
      <View style={styles.buttonsContainer}>
        <NavButton displayMe={this.props.displayPrev} onPress={this.props.onPressPrev} leftText={"<"} rightText={this.props.prevName} leftFlex={1} rightFlex={7}/>
        <NavButton displayMe={this.props.displayNext} onPress={this.props.onPressNext} leftText={this.props.nextName} rightText={">"} leftFlex={7} rightFlex={1}/>
      </View>
    )
  }
}

const NavButton = ({leftText, rightText, leftFlex, rightFlex, displayMe, onPress}) => {
  return (
    <View style={styles.buttonContainer}>
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
    height: 50,
    backgroundColor: colors.medium,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  button: {
    padding: 5,
    width: 130, 
    borderRadius: 4,
    backgroundColor: colors.background,
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    color: colors.dark
  }
})


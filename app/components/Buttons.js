import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import colors from '../static/colors';

const Buttons = ({ onPressPrev, prevName, onPressNext, nextName }) => (
  <View style={styles.buttonsContainer}>
    <NavButton onPress={onPressPrev} left={true} text={prevName} />
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Image style={{ height: 25, width: 160 }} source={require('../static/logo.png')} />
    </View>
    <NavButton onPress={onPressNext} left={false} text={nextName} />
  </View>
);
export default Buttons;

const NavButton = ({ text, onPress, left }) => (
  <View style={[styles.buttonContainer, { alignItems: left ? 'flex-start' : 'flex-end' }]}>
    <TouchableOpacity style={[styles.button, { justifyContent: left ? 'flex-start' : 'flex-end' }]} onPress={onPress}>
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  </View>
);

NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  left: PropTypes.bool.isRequired,
};

Buttons.propTypes = {
  onPressPrev: PropTypes.func,
  prevName: PropTypes.string,
  onPressNext: PropTypes.func,
  nextName: PropTypes.string,
};

Buttons.defaultProps = {
  onPressPrev: () => {},
  prevName: '',
  onPressNext: () => {},
  nextName: '',
};

const styles = StyleSheet.create({
  buttonsContainer: {
    paddingTop: Platform.OS === 'web' ? 0 : 10,
    height: Platform.OS === 'web' ? 50 : 60,
    backgroundColor: colors.medium,
    flexDirection: 'row',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    marginRight: 10,
    marginLeft: 10,
    width: 50,
    height: 30,
    borderRadius: 4,
    backgroundColor: colors.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.background,
    fontWeight: 'bold',
  },
});

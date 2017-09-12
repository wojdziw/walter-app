import React from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import colors from '../static/colors';

const Header = () => (
  <View style={styles.headerContainer} >
    <Image style={{ height: 25, width: 160 }} source={require('../static/logo.png')} />
    <Text style={styles.headerSubtitle}>
      powered by eWaiter.pl
    </Text>
  </View>);
export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'web' ? 0 : 10,
    height: Platform.OS === 'web' ? 60 : 80,
    backgroundColor: colors.background,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.0,
    borderBottomColor: colors.light,
  },
  headerSubtitle: {
    fontFamily: 'MarkerFelt-Wide',
    fontSize: 14,
    color: colors.dark,
  },
});

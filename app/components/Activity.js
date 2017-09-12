import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../static/colors';

const Activity = () => (
  <View style={styles.indicator}>
    <ActivityIndicator color={colors.dark} size="large" />
  </View>
);
export default Activity;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../static/colors'

export default class Activity extends Component {
    render() {
        return (
            <View style={styles.indicator}>
                <ActivityIndicator color={colors.dark} size="large"/>
            </View>
        )
    }   
}

const styles = StyleSheet.create({
  indicator: {
      flex: 1, 
      backgroundColor: 
      colors.background, 
      alignItems: 'center', 
      justifyContent: 'center'
    }
})


import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Header, Buttons } from '../components'


import colors from '../static/colors'

export default class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {tables: [], text: ""};
  }

  componentWillMount() {
    let jsonString = require("../static/tables.json");
    this.setState({tables: jsonString['tableNames']});
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Header />

        <View style={styles.mainContainer}>
          <View style={[{flex:1}, styles.description]}>
            <Text
              style={{fontSize: 20, color: colors.dark}}>
              Please choose your table number below.
            </Text>
          </View>

          <View style={[{flex: 3}, styles.picker]}>
            <TextInput
              style={{height: 50, width: 250, borderColor: colors.light, borderRadius: 5, borderWidth: 1, fontSize: 25, justifyContent: 'center', alignItems: 'center', paddingLeft: 20}}
              onChangeText={(text) => {this.setState({text})}}
              value={this.state.text}
            />
          </View>
        </View>

        <Buttons
        nextName = "menu"
        displayPrev={false}
        displayNext={true}
        onPressNext={() => {console.log('Menu')}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingBottom: 100
  },
  description: {
    justifyContent: 'flex-end', 
    padding: 30 
  },
  mainContainer: {
    flex: 1, 
    backgroundColor: colors.background
  }
})

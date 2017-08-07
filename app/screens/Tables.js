import React, { Component } from 'react';
import { Text, View, Picker, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Header, Buttons } from '../components'

import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'

import colors from '../static/colors'

class Tables extends Component {

  constructor(props) {
    super(props)

    this.state = {tables: []};
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Header />

        <ScrollView style={styles.mainContainer} >
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={[{flex:1}, styles.description]}>
              <Text
                style={{fontSize: 20, color: colors.dark}}>
                Please choose your table number below.
              </Text>
            </View>

            <View style={[{flex: 3}, styles.picker]}>
              <TextInput
                style={{height: 50, width: 250, borderColor: colors.light, borderRadius: 5, borderWidth: 1, fontSize: 25, textAlign: 'center'}}
                onChangeText={(text) => {this.props.chooseTable(text.toString())}}
                value={this.props.tableNumber}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        <Buttons
        nextName = "menu"
        displayPrev={false}
        displayNext={true}
        onPressNext={() => this.props.chooseScreen('Menu')} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    tableNumber: state.tableNumber,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Tables);

const styles = StyleSheet.create({
  picker: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 100
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

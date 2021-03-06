import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Header, Buttons, Total, Activity, MenuTile } from '../components'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import colors from '../static/colors'
import navigate from '../config/navigate'

class Menu extends Component {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Buttons
        prevName = "←"
        nextName = ""
        onPressPrev={() => navigate('Tables', this.props, true)}
        />

        {(Object.keys(this.props.order.items).length > 0) && <MenuTiles {...this.props}/>}

        {(Object.keys(this.props.order.items).length == 0) && <Activity />} 

        <Total onPress={() => navigate('Summary', this.props)} text={"cart"} {...this.props} />
      
      </View>
    );
  }
}

class MenuTiles extends Component {
  render() {
    return (
      <ScrollView style={{paddingTop: 4, paddingLeft: 4, paddingRight: 4 , backgroundColor: colors.background }}>
        {Object.values(this.props.order.items).map((position, index) => {
          return (
            position.id != null &&
            <View key={position.id} style={{height: 250, flexDirection: 'row'}}>
              <MenuTile key={position.id} id={position.id} {...this.props}/>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    order: state.order
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Header, Buttons, Total, Activity, MenuTile } from '../components'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import colors from '../static/colors'

class Menu extends Component {

  componentWillMount() {
    if (Object.keys(this.props.order.items).length == 0) {
      this.props.fetchMenu();
    }
    if (this.props.order.tip) {
      this.props.switchTip();
    }
  }

  render() {

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Header />

        {(Object.keys(this.props.order.items).length > 0) && <MenuTiles {...this.props}/>}

        {(Object.keys(this.props.order.items).length == 0) && <Activity />} 

        <TouchableOpacity onPress={() => this.props.chooseScreen('Summary')}>
          <Total {...this.props} />
        </TouchableOpacity>
        
        <Buttons
        prevName = "table"
        nextName = "summary"
        displayPrev={true}
        displayNext={true}
        onPressPrev={() => this.props.chooseScreen('Tables')}
        onPressNext={() => this.props.chooseScreen('Summary')}
        />
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
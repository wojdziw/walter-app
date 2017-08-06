import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Buttons, Total, Activity, MenuTile } from '../components'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import colors from '../static/colors'

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {menuItemsLength: 0}
  }

  componentWillMount() {
    this.props.fetchMenu();
  }

  componentDidMount() {
    refreshPositions = setInterval(() => 
      {this.setState({menuPositionsLength: Object.keys(this.props.order.items).length}); 
      if(this.state.menuItemsLength>0) {
        clearInterval(refreshPositions);
      }
      }, 500);
  }
  
  componentWillUnmount() {
    clearInterval(refreshPositions);
  }

  render() {

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Header />

        {(Object.keys(this.props.order.items).length > 0) && <MenuTiles {...this.props}/>}

        {(Object.keys(this.props.order.items).length == 0) && <Activity />} 

        <TouchableOpacity onPress={() => console.log('Summary')}>
          <Total {...this.props} />
        </TouchableOpacity>
        
        <Buttons
        prevName = "table"
        nextName = "summary"
        displayPrev={true}
        displayNext={true}
        onPressPrev={() => {console.log('Tables')}}
        onPressNext={() => {console.log('Summary')}}
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
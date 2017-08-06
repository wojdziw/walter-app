import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Header, Buttons, Total } from '../components'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'

import colors from '../static/colors'

class Summary extends Component {

  componentWillUnmount() {
    if (this.props.order.tip) {
      this.props.switchTip();
    }
  }

  render() {

    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Header />

        <ScrollView style={{paddingTop: 8, paddingLeft: 8, paddingRight: 8, flex: 1, backgroundColor: colors.background }}>
          <TipAdder switchTip={this.props.switchTip} order={this.props.order}/>

          {Object.values(this.props.order.items).map((position, index) => {
            return (
              position.count>0 &&
              <Position key={position.id} position={position} />
            )
          })}

        </ScrollView>

        <Total {...this.props} />

        <Buttons
        prevName = "menu"
        nextName = "payment"
        displayPrev={true}
        displayNext={this.props.order.total>0 && true}
        onPressPrev={() => {console.log('Menu')}}
        onPressNext={() => {console.log('Payment')}}
        />
      </View>
    );
  }
}

const TipAdder = ({switchTip, order}) => {
  return (
    <TouchableOpacity onPress={() => {switchTip()}}>
      <View style={[styles.positionContainer, {backgroundColor: colors.medium, borderColor: colors.medium}]}>
        <View style={styles.positionNameContainer}>                
          <Text style={[{flex: 6, color: colors.background}, styles.positionNameText]}>
            { order.tip ? "Remove 10% tip" : "Add 10% tip" }
          </Text>
          <Text style={{flex: 4, fontSize: 15, color: colors.background}}>
            { order.tip ? (order.total/11).toFixed(2) : (order.total*0.1).toFixed(2)} zł
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Position = ({position}) => {
  return (
    <View style={[styles.positionContainer, {backgroundColor: colors.background, borderColor: colors.light}]}>
      <View style={styles.positionNameContainer}>                
        <Text style={[{flex: 6, color: colors.dark}, styles.positionNameText]}>
          { position.name }
        </Text>
        <Text style={{flex: 4, fontSize: 15, color: colors.dark}}>
          { position.count } x { position.price } zł {"\n"}
          ={ (position.count*position.price).toFixed(2) } zł
        </Text>
      </View>
    </View>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    order: state.order
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

const styles = StyleSheet.create({
  positionContainer: {
    margin: 4, 
    borderRadius: 8, 
    borderWidth: 1.0
  },
  positionNameContainer: {
    height: 50, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  positionNameText: {
    paddingLeft: 20, 
    fontSize: 18, 
    fontWeight: 'bold', 
  }
})



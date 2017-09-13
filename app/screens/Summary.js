import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Header, Buttons, Total } from '../components'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'

import colors from '../static/colors'
import navigate from '../config/navigate'

class Summary extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Buttons
        prevName = "←"
        nextName = ""
        onPressPrev={() => {navigate('Menu', this.props, true); this.props.order.tip && this.props.switchTip();}}
        />

        <ScrollView style={{paddingTop: 8, paddingLeft: 8, paddingRight: 8, flex: 1, backgroundColor: colors.background }}>
          <TipAdder switchTip={this.props.switchTip} order={this.props.order}/>

          {Object.values(this.props.order.items).map((position, index) => {
            return (
              position.count>0 &&
              <Position key={position.id} position={position} />
            )
          })}

        </ScrollView>

        <Total onPress={() => navigate('Payment', this.props)} text={"pay"} {...this.props} />

        
      </View>
    );
  }
}

const TipAdder = ({switchTip, order}) => {
  return (
    <TouchableOpacity onPress={() => {switchTip()}}>
      <View style={[styles.positionContainer, {backgroundColor: colors.medium, borderWidth: 0, borderColor: colors.medium}]}>
        <View style={styles.positionNameContainer}>                
          <View style={{flex: 6, paddingLeft: 20}}>
            <Text style={{color: colors.background, fontSize: 18, fontWeight: 'bold'}}>
              { order.tip ? "Remove 10% tip" : "Add 10% tip" }
            </Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end', marginRight: 20}}>
            <Text style={{fontSize: 15, color: colors.background}}>
              { order.tip ? (order.total/11).toFixed(2) : (order.total*0.1).toFixed(2)} zł
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Position = ({position}) => {
  return (
    <View style={[styles.positionContainer, {backgroundColor: colors.background, borderWidth: 1.0, borderColor: colors.light}]}>
      <View style={styles.positionNameContainer}>                
        <View style={{flex: 6, paddingLeft: 20}}>
          <Text style={{color: colors.dark, fontSize: 18, fontWeight: 'bold'}}>
            { position.name }
          </Text>
        </View>
        <View style={{flex: 4, alignItems: 'flex-end', marginRight: 20}}>
          <Text style={{fontSize: 15, color: colors.dark}}>
            { position.count } x { position.price } zł
          </Text>
          <Text style={{fontSize: 15, color: colors.dark}}>
            = { (position.count*position.price).toFixed(2) } zł
          </Text>
        </View>
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
    borderRadius: 8
  },
  positionNameContainer: {
    height: 50, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
})



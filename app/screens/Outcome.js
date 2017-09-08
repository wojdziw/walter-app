import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';
import { Header, Buttons, Total, Activity } from '../components'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import RNRestart from 'react-native-restart';
import colors from '../static/colors'

class Outcome extends Component {

  componentWillUnmount() {
    // have to update the id, otherwise failed transaction refreshes to Canceled in payment
    if (this.props.transactionStatus == "CANCELED") {
      this.props.changeId()
    }
    this.props.updateTransactionStatus("")
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Buttons
        prevName = {this.props.transactionStatus == 'CANCELED' ? "←" : ""}
        nextName = {this.props.transactionStatus == 'CANCELED' ? "" : "↻"}
        onPressPrev={() => this.props.chooseScreen('Summary')}
        onPressNext={() => this.props.chooseScreen('Tables')}
        />

        {!(this.props.transactionStatus == "COMPLETED" || this.props.transactionStatus == "CANCELED") &&
          <Activity />}
        {(this.props.transactionStatus == "COMPLETED" || this.props.transactionStatus == "CANCELED") &&
          <View style={styles.statusesContainer}>
            <View style={[{flex: 1}, styles.statusContainer]}>
              <Text style={{flex: 6, fontSize: 25, fontWeight: 'bold', color: colors.dark}}>
                  {this.props.transactionStatus == 'COMPLETED' ?  'Payment success!' : 'Payment failure!'}
              </Text>
              <Text style={{flex: 6, fontSize: 12, color: colors.dark}}>
                  {this.props.transactionStatus == 'COMPLETED' && 'Order id: ' + this.props.order.id}  
              </Text>
            </View>

            <View style={[{flex: 4}, styles.statusContainer]}>
              <Image
                  style={{width: 250, height: 250}}
                  source={this.props.transactionStatus == 'COMPLETED' ? require('../static/success.png') : require('../static/failure.png')}
              />
            </View>
          </View>}
      </View>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    transactionStatus: state.transactionStatus,
    order: state.order,
    tableNumber: state.tableNumber
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Outcome);

const styles = StyleSheet.create({
  statusContainer: {
    backgroundColor: colors.background, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  statusesContainer: {
    flex: 1, 
    paddingTop: 20, 
    paddingBottom: 35, 
    backgroundColor: colors.background
  }
})
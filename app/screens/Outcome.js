import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';
import { Header, Buttons, Total, Activity } from '../components'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import RNRestart from 'react-native-restart';
import colors from '../static/colors'

class Outcome extends Component {

  componentDidMount() {
    interval = setInterval(() => { 
      this.props.fetchOrderStatus();
      if (this.props.orderStatus == "COMPLETED" || this.props.orderStatus == "CANCELED") {
        if (this.props.orderStatus == "COMPLETED") {
          this.props.sendOrder();
        }
        clearInterval(interval);
      }
    }, 200);
  }

  componentWillUnmount() {
    this.props.updateOrderStatus("")
  }

  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;

    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Header />

        {!(this.props.orderStatus == "COMPLETED" || this.props.orderStatus == "CANCELED") &&
          <Activity />}
        {(this.props.orderStatus == "COMPLETED" || this.props.orderStatus == "CANCELED") &&
          <View style={styles.statusesContainer}>
            <View style={[{flex: 1}, styles.statusContainer]}>
              <Text style={{flex: 6, fontSize: 25, fontWeight: 'bold', color: colors.dark}}>
                  {this.props.orderStatus == 'COMPLETED' ?  'Payment success!' : 'Payment failure!'}
              </Text>
              <Text style={{flex: 6, fontSize: 12, color: colors.dark}}>
                  {this.props.orderStatus == 'COMPLETED' && 'Order id: ' + this.props.order.id}  
              </Text>
            </View>

            <View style={[{flex: 4}, styles.statusContainer]}>
              <Image
                  style={{width: 250, height: 250}}
                  source={this.props.orderStatus == 'COMPLETED' ? require('../static/success.png') : require('../static/failure.png')}
              />
            </View>
          </View>}

        <Buttons
        prevName = "summary"
        nextName = "start again"
        displayPrev={this.props.orderStatus == 'CANCELED'}
        displayNext={this.props.orderStatus == 'COMPLETED'}
        onPressPrev={() => this.props.chooseScreen('Summary')}
        onPressNext={() => location.reload()}
        />
      </View>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    orderStatus: state.orderStatus,
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
    paddingBottom: 50, 
    backgroundColor: colors.background
  }
})
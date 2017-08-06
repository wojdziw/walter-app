import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header, Buttons, Total, Activity } from '../components'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { connect } from 'react-redux'
import colors from '../static/colors'

class Payment extends Component {

  componentWillMount() {
    this.props.fetchPaymentUri();
  }

  componentWillUnmount() {
    this.props.setPaymentUri("");
  }

  render() {

    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Header />
        {(this.props.paymentUri != "") && <PayU uri={this.props.paymentUri}/>}
        {(this.props.paymentUri == "") && <Activity />}
        <Total {...this.props} />
        <Buttons
        prevName = "summary"
        nextName = "Pay!"
        displayPrev={true}
        displayNext={false}
        onPressPrev={() => this.props.chooseScreen('Menu')}
        />
      </View>
    );
  }
}

const PayU = ({uri}) => {
  window.open(uri, '_blank');
  return (
    <View style={{flex: 1}}>
      <Text
        style={{fontSize: 20, color: colors.dark}}>
        Please complete your payment in the new tab.
      </Text>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    paymentUri: state.paymentUri,
    order: state.order
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
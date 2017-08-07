import React, { Component } from 'react';
import { Text, View, Platform, WebView } from 'react-native';
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
        {(this.props.paymentUri != "") && Platform.OS == 'web' && <PaymentBrowser uri={this.props.paymentUri}/>}
        {(this.props.paymentUri != "") && Platform.OS != 'web' && <PaymentWebview uri={this.props.paymentUri}/>}
        {(this.props.paymentUri == "") && <Activity />}
        <Total {...this.props} />
        <Buttons
        prevName = "summary"
        nextName = "outcome"
        displayPrev={true}
        displayNext={Platform.OS=='web'}
        onPressPrev={() => this.props.chooseScreen('Menu')}
        onPressNext={() => this.props.chooseScreen('Outcome')}
        />
      </View>
    );
  }
}

const PaymentBrowser = ({uri}) => {
  return (
    <View style={{flex:1, justifyContent: 'center', padding: 40}}>
      <Text style={{fontSize: 20, color: colors.dark}}>
        Please follow the <a href={uri} target="_blank">payment link</a>{"\n"}
        and press 'outcome' below when done.
      </Text>
      <Text style={{marginTop: 100, fontSize: 20, color: colors.dark, fontWeight: 'bold'}}>
        Do not refresh this page!
      </Text>
    </View>
  );
}

const PaymentWebview = ({uri}) => {
  return (
    <WebView
      source={{uri: uri}}
    />
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
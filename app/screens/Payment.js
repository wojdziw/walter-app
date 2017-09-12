import React, { Component, PropTypes } from 'react';
import { Text, View, Platform, WebView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Buttons, Activity } from '../components';
import ActionCreators from '../actions';
import colors from '../static/colors';
import navigate from '../config/navigate';

class Payment extends Component {
  componentWillMount() {
    this.props.fetchPaymentUri();
  }

  componentDidMount() {
    const interval = setInterval(() => { 
      this.props.fetchTransactionStatus();
      if (this.props.transactionStatus === 'COMPLETED' || this.props.transactionStatus === 'CANCELED') {
        if (this.props.transactionStatus === 'COMPLETED') {
          this.props.sendOrder();
        }
        clearInterval(interval);
        navigate('Outcome', this.props)
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.props.setPaymentUri('');
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Buttons
          prevName="←"
          nextName=""
          onPressPrev={() => navigate('Summary', this.props, true)}
        />
        {(this.props.paymentUri !== '') && Platform.OS === 'web' && <PaymentBrowser uri={this.props.paymentUri} />}
        {(this.props.paymentUri !== '') && Platform.OS !== 'web' && <PaymentWebview uri={this.props.paymentUri} />}
        {(this.props.paymentUri === '') && <Activity />}
      </View>
    );
  }
}

const PaymentBrowser = ({ uri }) => (
  <View style={{ flex: 1, justifyContent: 'center', padding: 40 }}>
    <Text style={{ fontSize: 20, color: colors.dark }}>
      Please follow the <a href={uri} target="_blank">payment link</a>.
    </Text>
    <Text style={{ marginTop: 100, fontSize: 20, color: colors.dark, fontWeight: 'bold' }}>
      Do not refresh this page!
    </Text>
  </View>
);

const PaymentWebview = ({ uri }) => (
  <WebView
    source={{ uri }}
  />
);

Payment.propTypes = {
  fetchPaymentUri: PropTypes.func.isRequired,
  fetchTransactionStatus: PropTypes.func.isRequired,
  sendOrder: PropTypes.func.isRequired,
  setPaymentUri: PropTypes.func.isRequired,
  transactionStatus: PropTypes.string.isRequired,
  paymentUri: PropTypes.string.isRequired,
};

PaymentBrowser.propTypes = {
  uri: PropTypes.string.isRequired,
};

PaymentWebview.propTypes = {
  uri: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    paymentUri: state.paymentUri,
    order: state.order,
    transactionStatus: state.transactionStatus,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
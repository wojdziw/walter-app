import React, { Component } from 'react';
import Tables from './screens/Tables'
import Menu from './screens/Menu'
import Summary from './screens/Summary'
import Payment from './screens/Payment'
import Outcome from './screens/Outcome'
import { bindActionCreators } from 'redux'
import { ActionCreators } from './actions'
import { connect } from 'react-redux'

class BasicNavigator extends Component {
  render() {
    if (this.props.screen == 'Tables') return <Tables />
    if (this.props.screen == 'Menu') return <Menu />
    if (this.props.screen == 'Summary') return <Summary />
    if (this.props.screen == 'Payment') return <Payment />
    if (this.props.screen == 'Outcome') return <Outcome />
    return <Tables />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    screen: state.screen
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicNavigator);
import React, { Component } from 'react';
import Tables from './screens/Tables'
import Menu from './screens/Menu'
import Summary from './screens/Summary'
import Payment from './screens/Payment'
import { bindActionCreators } from 'redux'
import { ActionCreators } from './actions'
import { connect } from 'react-redux'

class Navigator extends Component {
  render() {
    console.log(this.props.screen)
    if (this.props.screen == 'Tables') return <Tables />
    if (this.props.screen == 'Menu') return <Menu />
    if (this.props.screen == 'Summary') return <Summary />
    if (this.props.screen == 'Payment') return <Payment />
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
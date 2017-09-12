import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent, PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
import { Buttons, Total, Activity, MenuTile } from '../components';
import ActionCreators from '../actions';
import colors from '../static/colors';
import navigate from '../config/navigate';

class Menu extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Buttons
          prevName="←"
          nextName=""
          onPressPrev={() => navigate('Tables', this.props, true)}
        />

        {(Object.keys(this.props.order.items).length > 0) &&
        <MenuTiles
          order={this.props.order}
          plusMenuPositionCount={this.props.plusMenuPositionCount}
          minusMenuPositionCount={this.props.minusMenuPositionCount}
        />}

        {(Object.keys(this.props.order.items).length === 0) && <Activity />}

        <Total onPress={() => navigate('Summary', this.props)} text={'cart'} total={this.props.order.total} />
      </View>
    );
  }
}

const MenuTiles = ({ order, plusMenuPositionCount, minusMenuPositionCount }) => (
  <ScrollView style={{
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: colors.background,
  }}
  >
    {Object.values(order.items).map((position) => {
      return (
        position.id != null &&
        <View key={position.id} style={{ height: 250, flexDirection: 'row' }}>
          <MenuTile
            key={position.id}
            id={position.id}
            items={order.items}
            plusMenuPositionCount={plusMenuPositionCount}
            minusMenuPositionCount={minusMenuPositionCount}
          />
        </View>
      );
    })}
  </ScrollView>
);

MenuTiles.propTypes = {
  order: PropTypes.object.isRequired,
  plusMenuPositionCount: PropTypes.func.isRequired,
  minusMenuPositionCount: PropTypes.func.isRequired,
};

Menu.propTypes = {
  order: PropTypes.object.isRequired,
  plusMenuPositionCount: PropTypes.func.isRequired,
  minusMenuPositionCount: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    order: state.order,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

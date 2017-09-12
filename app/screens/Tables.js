import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Buttons } from '../components';
import ActionCreators from '../actions';
import colors from '../static/colors';
import navigate from '../config/navigate';

class Tables extends Component {
  componentWillMount() {
    this.props.fetchMenu();
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Buttons
          prevName=""
          nextName=""
        />

        <ScrollView style={styles.mainContainer} >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={[{ flex: 1 }, styles.description]}>
              <Text
                style={{ fontSize: 20, color: colors.dark }}
              >
                Please choose your table number below.
              </Text>
            </View>

            <View style={[{ flex: 3 }, styles.picker]}>
              <TextInput
                style={{ height: 50, width: 120, borderColor: colors.light, borderRadius: 5, borderWidth: 1, fontSize: 25, textAlign: 'center' }}
                onChangeText={(text) => { this.props.chooseTable(text.toString()); }}
                value={this.props.tableNumber}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate('Menu', this.props)}
              >
                <Text style={styles.text}>
                  ok
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        </ScrollView>

      </View>
    );
  }
}

Tables.propTypes = {
  fetchMenu: PropTypes.func.isRequired,
  chooseTable: PropTypes.func.isRequired,
  tableNumber: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(state) {
  return {
    tableNumber: state.tableNumber,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Tables);

const styles = StyleSheet.create({
  picker: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 100,
  },
  description: {
    justifyContent: 'flex-end',
    padding: 30,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  button: {
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: colors.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.background,
    fontWeight: 'bold',
  },
});

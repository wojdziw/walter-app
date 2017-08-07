import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../static/colors'

export default class MenuTile extends Component {
  render() {
    return (
      <View style={[styles.tile, {flex: 1}]}>
        <Image style={[styles.image, {flex: 3}]} source={{uri: this.props.order.items[this.props.id].url}} />
        <View style={styles.tileInfo}>
          <Quantity flex={15} quantity={this.props.order.items[this.props.id].count} />
          <NamePrice flex={35} name={this.props.order.items[this.props.id].name} price={this.props.order.items[this.props.id].price} />
          <PlusMinusButton flex={23} onPress={() => {this.props.plusMenuPositionCount(this.props.id)}} isPlus={true} />
          <PlusMinusButton flex={23} onPress={() => {this.props.minusMenuPositionCount(this.props.id)}} isPlus={false} />
        </View>
      </View>
    )
  }
}

const PlusMinusButton = ({onPress, isPlus, flex}) => {
  return (
    <View style={[styles.plusMinusButton, {flex: flex}]}>
      <TouchableOpacity style={styles.button} onPress={onPress}> 
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>
            {isPlus ? "+" : "-"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const Quantity = ({quantity, flex}) => {
  return (
    <View style={[styles.quantity, {flex: flex}]}>
      <Text style={{fontWeight: 'bold', fontSize: 22, color: colors.dark}}>
        {quantity} x
      </Text>
    </View>
  )
}

const NamePrice = ({flex, name, price}) => {
  return (
    <View style={[styles.namePrice, {flex: 35}]}>
      <Text style={{color: colors.dark, fontWeight: 'bold', fontSize: 16}}>
        {name}
      </Text>
      <Text style={{color: colors.dark}}>
        {price} zł
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    width: 60,
    height: 30, 
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: colors.medium,
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonTextContainer: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 25, 
    color: colors.background, 
    fontWeight: 'bold'
  },
  image: {
    borderRadius: 4
  },
  tileInfo: {
    backgroundColor: colors.background, 
    flexDirection: 'row', 
    paddingTop: 8,
    height: 40
  },
  tile: {
    backgroundColor: colors.background, 
    flexDirection: 'column', 
    padding: 4, 
    borderRadius: 4, 
    margin: 4, 
    borderWidth: 1.0, 
    borderColor: colors.light
  },
  quantity: {
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    paddingRight: 10
  },
  namePrice: {
    justifyContent: 'center', 
    alignItems: 'flex-start'
  },
  plusMinusButton: {
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

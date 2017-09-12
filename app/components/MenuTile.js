import React, { PropTypes } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../static/colors';

const MenuTile = ({ items, plusMenuPositionCount, minusMenuPositionCount, id }) => (
  <View style={[styles.tile, { flex: 1 }]}>
    <Image style={[styles.image, { flex: 3 }]} source={{ uri: items[id].url }} />
    <View style={styles.tileInfo}>
      <Quantity flex={15} quantity={items[id].count} />
      <NamePrice flex={35} name={items[id].name} price={items[id].price} />
      <PlusMinusButton flex={23} onPress={() => plusMenuPositionCount(id)} isPlus={true} />
      <PlusMinusButton flex={23} onPress={() => minusMenuPositionCount(id)} isPlus={false} />
    </View>
  </View>
);
export default MenuTile;

const PlusMinusButton = ({ onPress, isPlus, flex }) => {
  return (
    <View style={[styles.plusMinusButton, { flex }]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>
            {isPlus ? '+' : '-'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Quantity = ({ quantity, flex }) => (
  <View style={[styles.quantity, { flex }]}>
    <Text style={{ fontWeight: 'bold', fontSize: 22, color: colors.dark }}>
      {quantity} x
    </Text>
  </View>
);

const NamePrice = ({ name, price }) => (
  <View style={[styles.namePrice, { flex: 35 }]}>
    <Text style={{ color: colors.dark, fontWeight: 'bold', fontSize: 16 }}>
      {name}
    </Text>
    <Text style={{ color: colors.dark }}>
      {price} zł
    </Text>
  </View>
);

MenuTile.propTypes = {
  items: PropTypes.object.isRequired,
  plusMenuPositionCount: PropTypes.func.isRequired,
  minusMenuPositionCount: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

PlusMinusButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  isPlus: PropTypes.bool.isRequired,
  flex: PropTypes.number.isRequired,
};

Quantity.propTypes = {
  quantity: PropTypes.number.isRequired,
  flex: PropTypes.number.isRequired,
};

NamePrice.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

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
    flexDirection: 'row',
  },
  buttonTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: colors.background,
    fontWeight: 'bold',
  },
  image: {
    borderRadius: 4,
  },
  tileInfo: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    paddingTop: 8,
    height: 50,
  },
  tile: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    padding: 4,
    borderRadius: 4,
    margin: 4,
    borderWidth: 1.0,
    borderColor: colors.light,
  },
  quantity: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  namePrice: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  plusMinusButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Menu from './screens/Menu'
import Tables from './screens/Tables'
import Summary from './screens/Summary'
import Payment from './screens/Payment'
import Outcome from './screens/Outcome'

export default StackNavigator({
  Home: { 
    screen: Tables,
    navigationOptions: {
      header: () => null,
    } 
  },
  Menu: { 
    screen: Menu,
    navigationOptions: {
      header: () => null,
    } 
  },
  Summary: { 
    screen: Summary,
    navigationOptions: {
      header: () => null,
    } 
  },
  Payment: { 
    screen: Payment,
    navigationOptions: {
      header: () => null,
    } 
  },
  Outcome: { 
    screen: Outcome,
    navigationOptions: {
      header: () => null,
    } 
  },
});
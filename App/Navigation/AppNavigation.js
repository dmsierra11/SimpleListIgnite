import { StackNavigator } from 'react-navigation'
import TransactionDetail from '../Containers/TransactionDetail'
import TransactionList from '../Containers/TransactionList'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  TransactionDetail: { screen: TransactionDetail },
  TransactionList: { screen: TransactionList },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'TransactionList',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav

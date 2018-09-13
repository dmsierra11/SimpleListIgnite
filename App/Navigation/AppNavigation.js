import { StackNavigator } from 'react-navigation'
import RatesList from '../Containers/RatesList'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  RatesList: { screen: RatesList },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'RatesList',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav

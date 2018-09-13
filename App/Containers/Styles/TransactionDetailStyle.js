import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  big_text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20
  },
  medium_text: {
    color: 'white',
    fontSize: 20
  }
})

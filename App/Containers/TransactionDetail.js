import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TransactionDetailStyle'

class TransactionDetail extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { navigation } = this.props
    const sku = navigation.state.params.sku
    const amount = navigation.state.params.amount
    const total = navigation.state.params.currency
    return (
      <View style={styles.container}>
        <Text style={styles.big_text}>{sku}</Text>
        <Text style={styles.medium_text}>{amount}</Text>
        <Text style={styles.medium_text}>{total}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)

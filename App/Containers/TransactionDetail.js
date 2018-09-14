import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import TransactionActions from '../Redux/TransactionsRedux'

// Styles
import styles from './Styles/TransactionDetailStyle'

class TransactionDetail extends Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.sku = this.props.navigation.state.params.sku
    console.log("ITEM SKU PRE: "+this.sku)
    this.props.getTotalTransactions(this.sku)
  }

  render () {
    const { navigation } = this.props
    // const sku = navigation.state.params.sku
    // const amount = navigation.state.params.amount
    const currency = navigation.state.params.currency
    return (
      <View style={styles.container}>
        <Text style={styles.big_text}>{this.sku}</Text>
        <Text style={styles.medium_text}>{this.props.total}</Text>
        <Text style={styles.medium_text}>{currency}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    total: state.transactions.total_by_sku
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTotalTransactions: (sku) => dispatch(TransactionActions.getTotalTransactions(sku)),
    getTransactions: () => dispatch(TransactionActions.transactionsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)

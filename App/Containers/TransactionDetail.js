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
    this.currency = this.props.navigation.state.params.currency
    this.props.getTotalTransactions(this.sku, this.currency)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.big_text}>{this.sku}</Text>
        <Text style={styles.medium_text}>{this.props.total}</Text>
        <Text style={styles.medium_text}>{this.currency}</Text>
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
    getTotalTransactions: (sku, currency) => dispatch(TransactionActions.getTotalTransactions({sku: sku, currency: currency})),
    getTransactions: () => dispatch(TransactionActions.transactionsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)
